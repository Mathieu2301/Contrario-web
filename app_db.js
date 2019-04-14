var fs = require("fs");

var file = "B:\\DB_JSON_1\\contrario.json";

fs.readFile(file, function(err, data){
    if (!err){
        DB = data;
    }else{
        console.log("{DB_ERROR}")
        console.log(err)
    }
})

module.exports = function(){
    var a = {
        update: function(new){

        }
    }
}