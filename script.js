//! Setup function fires automatically 

   var socket = io();

function setup() {
    var side = 30;
    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let predatorCountElement = document.getElementById('predatorCount');
    let lavaCountElement = document.getElementById('lavaCount');
    let hrshejCountElement = document.getElementById('hrshejCount');
    let waterCountElement = document.getElementById('waterCount');
    let waterEaterCountElement = document.getElementById('waterEaterCount');
    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        predatorCountElement.innerText = data.predatorCounter;
        lavaCountElement.innerText = data.lavaCounter;
        hrshejCountElement.innerText = data.hrshejCounter;
        waterCountElement.innerText = data.waterCounter;
        waterEaterCountElement.innerText = data.waterEaterCounter;
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)
        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    fill("green");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 2) {
                    fill("yellow");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill('orange');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill("black");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 6) {
                    fill("blue");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 7) {
                    fill("purple");
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}
function kill() {
    socket.emit("kill");
}
function addGrass() {
    socket.emit("addGrass");
}
function addGrassEater() {
    socket.emit("addGrassEater");
}
function addPredator() {
    socket.emit("addPredator");
}
function addLava() {
    socket.emit("addLava");
}
function addHrshej() {
    socket.emit("addHrshej");
}
function addWater() {
    socket.emit("addWater");
}
function addWaterEater() {
    socket.emit("addWaterEater");
}