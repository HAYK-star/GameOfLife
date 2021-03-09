var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class WaterEater extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 30
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
        var emptyCells = this.chooseCell(0).concat(this.chooseCell(1));
        var newCell = random(emptyCells);
        if (newCell) {
            waterEaterHashiv++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 7;
            let temp = new WaterEater(x, y);
            waterEaterArr.push(temp);
            this.life = 12;
        }
    }
    eat() {
        let emptyCells = this.chooseCell(6);
        let newCell = random(emptyCells);
        if (newCell) {
            this.life+=5;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 7;
            matrix[this.y][this.x] = 0;
            for (let i in waterArr) {
                if (waterArr[i].x == x && waterArr[i].y == y) {
                    waterArr.splice(i, 1); 
                    waterHashiv--; 
                }
            }
            this.x = x;
            this.y = y;

            if (this.life >= 21) {
                this.mul();
            }
        }
        else {
            this.move(); 
        }
    }
    move() {

        this.life--;
        let emptyCells = this.chooseCell(0).concat(this.chooseCell(1));
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 7;
            matrix[this.y][this.x] = 0; 
            for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1); 
                    grassHashiv--; 
                }
            }
            this.y = y;
            this.x = x;
           
        }
        if (this.life < 0) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i in waterEaterArr) {
            if (waterEaterArr[i].x == this.x && waterEaterArr[i].y == this.y) {
                waterEaterArr.splice(i, 1)
                waterEaterHashiv--;
            }
        }
    }
}