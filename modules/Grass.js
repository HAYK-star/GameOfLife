var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class Grass extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 0;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    mul() {
        this.life+=2;
        let newCell = random(this.chooseCell(0).concat(this.chooseCell(6)));
        if (newCell && this.life >= 4) {
            grassHashiv++;
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 1;
            var grass = new Grass(x, y, 1);
            grassArr.push(grass);
            this.life = 0;
            for (let i in waterArr) {
                if (waterArr[i].x == x && waterArr[i].y == y) {
                    waterArr.splice(i, 1);
                    waterHashiv--;
                }
            }
            // if (weath == "winter") {
            //     this.life -= 2;
            // }
            // if (weath == "spring") {
            //     this.life += 5;
            // }
            // if (weath == "summer") {
            //     this.life += 3;
            // }
            // if (weath == "autumn") {
            //     this.life--;      
            // }
        }
    }
}