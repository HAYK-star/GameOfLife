var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class Lava extends LiveForm {
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
        this.life++;
        let newCell = random(this.chooseCell(0).concat(this.chooseCell(1)).concat(this.chooseCell(2)).concat(this.chooseCell(3)));
        if (newCell && this.life > 10) {
            lavaHashiv++;
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 4;
            let lava = new Lava(x, y);
            lavaArr.push(lava);
            this.life = 0;
            for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1); 
                    grassHashiv--; 
                }
            }
        }
    }
}
