const fs = require("fs");
const dbfile = "B:\\JSON\\contrario_cards.json";
var cards = [];

function updateCardList(){
    fs.readFile(dbfile, function(err, data){
        if (err) throw err;
        cards = JSON.parse(data).cards;
        console.log(cards);
    })
}

fs.watchFile(dbfile, updateCardList)
updateCardList();

function card(difficulty, question, response, indice_1, indice_2){
    return {difficulty, question, response, indice_1, indice_2};
}

module.exports = function(log){

    this.getRandomCard = function(difficulty){
        var CG = cards.filter(v=>{return v.difficulty==difficulty});
        return CG[Math.floor(Math.random() * CG.length - 1)];
    }

    this.addCard = function(d, q, r, i1, i2){
        cards.push(card(d, q, r, i1, i2));
        fs.writeFileSync(dbfile, {cards});
        return cards[cards.length];
    }

    this.backup = function(rate, callback=(err)=>{}){
        var d = new Date();
        var newName = dbfile.replace('.json', ".bak-"
            +((rate=="hour") ? d.getHours() : '')
            +((rate=="hour" || rate=="day") ? d.getDay() : '')
            +((rate=="hour" || rate=="day" || rate=="month") ? d.getMonth() : '')
            +((rate=="hour" || rate=="day" || rate=="month" || rate=="year") ? d.getFullYear() : 'ONLY')
        +".json")

        fs.copyFile(dbfile, newName, callback)
        log("Database backup " + newName + " created");
    }

}