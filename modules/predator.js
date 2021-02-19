var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class Predator extends LiveForm{
    constructor(x, y){
        super(x,y); 
        this.life = 15; 
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
        let newCell = random(this.chooseCell(0));
        if (newCell) {
            predatorHashiv++; 
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            let predator = new Predator(x, y);
            predatorArr.push(predator);
            this.energy = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let index in predatorArr) {
            if (predatorArr[index].x == this.x && predatorArr[index].y == this.y) {
                predatorArr.splice(index, 1)
                predatorHashiv--; 
            }
        }
    }
    eat() {
        this.getNewCoordinates();
        let newCell = random(this.chooseCell(2));
        if (newCell) {
            this.life += 3;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;

            for (let index = 0; index < grassEaterArr.length; index++) {
                if (grassEaterArr[index].x == x && grassEaterArr[index].y == y) {
                    grassEaterArr.splice(index, 1)
                }
            }

            if (this.life >= 12) {
                this.mul()
            }
        }
        else { this.move() }
    }
    move() {
        this.life --;
        let newCell = random(this.chooseCell(0).concat(this.chooseCell(1)));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if (newCell && this.life < 0) {
            this.die();
        }
        if (this.life < 0) {
            this.die();
        }
    }
}