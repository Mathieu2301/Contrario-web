var app = require('express')();
var fs = require("fs");
var server = require('https').createServer({key: fs.readFileSync('B:/SSL/private.key', 'utf8'), cert: fs.readFileSync('B:/SSL/certificate.crt', 'utf8')}, app);
var io = require('socket.io')(server);
var port = process.env.PORT || 7621;

var game = new (require('events')).EventEmitter().setMaxListeners(0);

var r = require('rethinkdb')
r.connect(require("B:\\DB1\\connect.json"), function(err, conn) {
    conn.use("CONTRARIO");

    r.tableCreate('tv_shows').run(conn, function(err, res) {
        console.log(res || err.message);

        r.table('tv_shows').insert({ name: 'Star Trek TNG' }).run(conn, function(err, res){
            console.log(res || err.message);
        });

    });
});

var routes = require("./app_routes.js")(app);
log("WebServer: --------- OK");
var push = new (require("./app_push.js"))(log);
log("WebServer: --------- OK");


var Player = require("./app_player.js");
var players = [];

io.on("connection", function(client){
    client.emit("initialize", function(name){

        var player = new Player(client, name);
        players.push(player);

        client.on("subscribe_push", push.addPushToken);

        client.on("set_name", player.setName)
    
        client.on("disconnect", function(){
            players = players.filter(v=>{return v.socket.id!=client.id});
        })

    })
})

setInterval(function(){

    // players.filter(v=>{return v.player.roomID==roomID}).forEach(function(val){

    // });

}, 1000);


function fn(fn, ...a){return function(){fn(...a)}};
Array.prototype.remove=function(remove){return this.filter(val=>{if(val!=remove)return val})}
function log(log){console.log("[Contrario Web]: " + log);}
function getHour(){var d=new Date(),h=""+d.getHours(),m=""+d.getMinutes();return ((h.length==1)?"0":"")+h+":"+((m.length==1)?"0":"")+m;}

log("Listening on *:" + port)
server.listen(port);