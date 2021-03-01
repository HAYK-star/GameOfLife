var LiveForm = require("./LiveForm");
var random = require("./random.js");

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
        let newCell = random(this.chooseCell(0).concat(this.chooseCell(5)).concat(this.chooseCell(2)).concat(this.chooseCell(3)).concat(this.chooseCell(4)));
        if (newCell && this.life >= 4) {
            waterHashiv++;
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 6;
            let water = new Water(x, y);
            waterArr.push(water);
            this.life = 0;
            for (let i in lavaArr) {
                if (lavaArr[i].x == x && lavaArr[i].y == y) {
                    lavaArr.splice(i, 1); 
                    lavaHashiv--;
                    matrix[this.x][this.y] == 7; 
                    stoneHashiv++;  
                }
            }
            for (let i in grassEaterArr) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1); 
                    grassEaterHashiv--; 
                }
            }
            for (let i in predatorArr) {
                if (predatorArr[i].x == x && predatorArr[i].y == y) {
                    predatorArr.splice(i, 1); 
                    predatorHashiv--; 
                }
            }
            for (let i in hrshejArr) {
                if (hrshejArr[i].x == x && hrshejArr[i].y == y) {
                    hrshejArr.splice(i, 1); 
                    hrshejHashiv--; 
                }
            }
        }
    }
}