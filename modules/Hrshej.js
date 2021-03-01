var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class Hrshej extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 30;
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
        let newCell = random(this.chooseCell(0).concat(this.chooseCell(1)));
        if (newCell) {
            hrshejHashiv++; 
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 5;
            let hrshej = new Hrshej(x, y);
            hrshejArr.push(hrshej);
            this.life = 5;
        }
    }
   
    eat() {
        this.getNewCoordinates();
        let newCell = random(this.chooseCell(2).concat(this.chooseCell(4)));
        if (newCell) {
            this.life += 5;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;

            for (let index = 0; index < grassEaterArr.length; index++) {
                if (grassEaterArr[index].x == x && grassEaterArr[index].y == y) {
                    grassEaterArr.splice(index, 1)
                    grassEaterHashiv--; 
                }
            }
            for (let index = 0; index < lavaArr.length; index++) {
                if (lavaArr[index].x == x && lavaArr[index].y == y) {
                    lavaArr.splice(index, 1)
                    lavaHashiv--;
                }
            }
            if (this.life > 30) {
                this.mul()
            }
        }
        else { this.move() }
    }
    move() {
        this.life--;
        let newCell = random(this.chooseCell(0).concat(this.chooseCell(1)));
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
            for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1); 
                    grassHashiv--; 
                }
            }
        }
        if (newCell && this.life < 0) {
            this.die();
        }
        if (this.life < 0) {
            this.die();
        }
    }
     die() {
        matrix[this.y][this.x] = 0;
        for (let index in hrshejArr) {
            if (hrshejArr[index].x == this.x && hrshejArr[index].y == this.y) {
                hrshejArr.splice(index, 1)
                hrshejHashiv--; 
            }
        }
    }
}