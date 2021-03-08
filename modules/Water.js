var LiveForm = require("./LiveForm");
var random = require("./random.js");
var Stone = require("./Stone.js")

module.exports = class Water extends LiveForm {
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
        let newCell = random(this.chooseCell(0).concat(this.chooseCell(4)));
        if (newCell && this.life >= 4) {
            waterHashiv++;
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 6;
            var water = new Water(x, y);
            waterArr.push(water);
            this.life = 0;
            for (let i in lavaArr) {
                if (lavaArr[i].x == x && lavaArr[i].y == y) {
                    lavaArr.splice(i, 1); 
                    lavaHashiv--;
                    var stone = new Stone(this.x, this.y);
                    stoneArr.push(stone);
                    matrix[x][y] == 7; 
                    stoneHashiv++; 
                }
            }
        }
    }
}