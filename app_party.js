module.exports = function(players, ID, owner){

    var _this = {
        ID,owner,

        players: [],
        master: owner,
        started: false,

        join: function(player){
            if (!_this.players.includes(player) && !_this.started){
                _this.players.push(player);
                players[player].player.party = _this;
                _this.broadcast("party", _this);
                
                players[player].socket.on("disconnect", function(){ // Lorsque le joueur se déconnecte
                    _this.players = _this.players.filter(v=>{return v!=player}); // On le retire de la liste
                    _this.broadcast("party", _this)
                });
            }
        },

        broadcast: function(...event){
            _this.players.forEach(player => {
                players[player].socket.emit(...event)
            });
        }
    }

    players[owner].socket.on("party_start", function(){ // Lorsque l'owner décide de lancer la partie
        if (_this.players.length >= 3){ // Si on peut lancer, on lance la game
            _this.broadcast("party_start")
        }
    });

    function lancerTour(){

    }

    return _this;

}