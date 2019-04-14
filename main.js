var app = require('express')();
var fs = require("fs");
var server = require('https').createServer({key: fs.readFileSync('B:/SSL/private.key', 'utf8'), cert: fs.readFileSync('B:/SSL/certificate.crt', 'utf8')}, app);
var io = require('socket.io')(server);
var port = process.env.PORT || 7621;

var game = new (require('events')).EventEmitter().setMaxListeners(0);

var routes = require("./app_routes.js")(app);
log("WebServer: -------------- OK");
var push = new (require("./app_push.js"))(log);
log("Push: ------------------- OK");
var cards = new (require("./app_cards.js"))(log);
log("Cards: ------------------ OK");

setInterval(function(){
    cards.backup("hourly", function(err){
        if (err) console.error("/!\\ ERREUR LORS DE LA BACKUP /!\\")
    });   
}, 3600000); // 1 fois par heure

var Player = require("./app_player.js");
var players = [];

var Party = require("./app_party.js");
var parties = [];

game.on("party_list_update", function(){
    var list = []
    parties.forEach(function(val, index){
        list.push({
            ID: val.ID,
            owner: val.owner,
            started: val.started
        })
        if (index == parties.length-1) io.emit("party_list", list);
    })
})

io.on("connection", function(client){
    client.emit("initialize", function(name){
        log(name + " is connected")

        var player = new Player(client, name, players.length);
        players.push(player);

        client.once("create_party", function(){
            log(player.player.name + " is creating a party")
            var new_party = new Party(players, parties.length, player.ID);

            parties.push(new_party);
            
            new_party.join(player.ID);
            
            game.emit('party_list_update');
            
            client.on("disconnect", function(){ // Si l'ownwer se déconnecte
                new_party.broadcast("end_game"); // On demande a tout le monde de se déconnecter
                parties = parties.filter(v=>{return v.ID!=new_party.ID}); // On supprime la game de la liste
            })
        })

        client.on("subscribe_push", push.addPushToken);
    
        client.on("disconnect", function(){
            players = players.filter(v=>{return v.socket.id!=client.id});
        })

    })
})

setInterval(function(){
    console.log(parties)
}, 2000)

function fn(fn, ...a){return function(){fn(...a)}};
function log(log){console.log("[Contrario Web]: " + log);}
function getHour(){var d=new Date(),h=""+d.getHours(),m=""+d.getMinutes();return ((h.length==1)?"0":"")+h+":"+((m.length==1)?"0":"")+m;}
function random(len){var t="";var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(var i=0;i<len;i++)t+=a.charAt(Math.floor(Math.random()*a.length));return t;}

log("Listening on *:" + port)
server.listen(port);