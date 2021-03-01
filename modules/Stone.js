var LiveForm = require("./LiveForm");

module.exports = class Stone extends LiveForm{
    constructor(x, y) {
        super(x, y);
        this.energy = 0; 
    }

    getNewCoordinates() {
        super.getNewCoordinates();
    }
}