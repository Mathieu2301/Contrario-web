var app = require('express')();
var fs = require("fs");
var server = require('https').createServer({key: fs.readFileSync('B:/SSL/private.key', 'utf8'), cert: fs.readFileSync('B:/SSL/certificate.crt', 'utf8')}, app);
var io = require('socket.io')(server);
var port = process.env.PORT || 7621;

var game = new (require('events')).EventEmitter().setMaxListeners(0);

var routes = require("./app_routes.js")(app);
log("WebServer: --------- OK");
var push = new (require("./app_push.js"))(log);
log("Push: -------------- OK");
var cards = new (require("./app_cards.js"))(log);
log("Cards: ------------- OK");

setInterval(function(){
    cards.backup("hourly", function(err){
        if (err) console.error("/!\\ ERREUR LORS DE LA BACKUP /!\\")
    });   
}, 1000*60*60);

var Player = require("./app_player.js");
var players = [];

io.on("connection", function(client){
    client.emit("initialize", function(name){

        var player = new Player(client, name);
        players.push(player);

        client.on("create_game", function(){

        })
    
        client.on("disconnect", function(){
            players = players.filter(v=>{return v.socket.id!=client.id});
        })

    })
})

function fn(fn, ...a){return function(){fn(...a)}};
Array.prototype.remove=function(remove){return this.filter(val=>{if(val!=remove)return val})}
function log(log){console.log("[Contrario Web]: " + log);}
function getHour(){var d=new Date(),h=""+d.getHours(),m=""+d.getMinutes();return ((h.length==1)?"0":"")+h+":"+((m.length==1)?"0":"")+m;}

log("Listening on *:" + port)
server.listen(port);