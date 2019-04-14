module.exports = function(socket, name, ID){

    var _this = {
        ID,socket,
        player: {
            name: name,
            socketUID: socket.id
        },

        setName: function(name){
            _this.player.name = name;
            console.log("Name changed to : " + name);
        }
    }

    _this.socket.on("set_name", _this.setName)

    return _this;
}