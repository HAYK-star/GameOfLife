var LiveForm = require("./LiveForm");
var random = require("./random.js");
var Stone = require("./Stone"); 

module.exports = class StoneBracker extends LiveForm {
    constructor(x, y) {
        super(x, y);
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
    move() {
        let emptyCells = this.chooseCell(0).concat(this.chooseCell(1).concat(this.chooseCell(4)).concat(this.chooseCell(6)).concat(this.chooseCell(7)));
        let newCell = random(emptyCells);
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 8;
            matrix[this.y][this.x] = 0;
            this.x = x; 
            this.y = y;
            for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1);
                    grassHashiv--;
                }
            }
            for (let i in lavaArr) {
                if (lavaArr[i].x == x && lavaArr[i].y == y) {
                    lavaArr.splice(i, 1);
                    lavaHashiv--;
                }
            }
            for (let i in waterArr) {
                if (waterArr[i].x == x && waterArr[i].y == y) {
                    waterArr.splice(i, 1);
                    waterHashiv--;
                }
            }
            for (let i in stoneArr) {
                if (stoneArr[i].x == x && stoneArr[i].y == y) {
                    stoneArr.splice(i, 1);
                    stoneHashiv--;
                    console.log(stoneHashiv);
                }
            }
        }
    }
}