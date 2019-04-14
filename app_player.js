module.exports = function(socket, name){
    this.socket = socket;
    this.player = {
        socketUID: socket.id,
        name: name,
        roomID: 0,
        searching: false,
    }

    this.setName = function(name){
        this.player.name = name;
        console.log(this.player)
    }

}