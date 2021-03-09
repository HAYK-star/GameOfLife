//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require("./modules/predator.js");
var Lava = require("./modules/Lava.js");
var Hrshej = require("./modules/Hrshej.js");
var Water = require("./modules/Water.js"); 
var WaterEater = require("./modules/WaterEater.js"); 
let random = require('./modules/random.js');
//! Requiring modules  --  END

//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
predatorArr = [];
lavaArr = [];
hrshejArr = [];
waterArr = []; 
waterEaterArr = [];
matrix = [];
grassHashiv = 0;
grassEaterHashiv = 0;
predatorHashiv = 0;
lavaHashiv = 0;
hrshejHashiv = 0;
waterHashiv = 0; 
waterEaterHashiv = 0; 
//! Setting global arrays  -- END

//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, Predator, Lava, Hrshej, Water, WaterEater) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < Predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < Lava; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < Hrshej; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
    for (let i = 0; i < Water; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 6;
    }
    for (let i = 0; i < WaterEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 7;
    }
}
matrixGenerator(25, 2, 2, 2, 2, 2, 2, 5);
//! Creating MATRIX -- END

//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++; 
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            } else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                predatorArr.push(predator);
                predatorHashiv++;
            } else if (matrix[y][x] == 4) {
                var lava = new Lava(x, y);
                lavaArr.push(lava);
                lavaHashiv++;
            } else if (matrix[y][x] == 5) {
                var hrshej = new Hrshej(x, y);
                hrshejArr.push(hrshej);
                hrshejHashiv++;
            } else if (matrix[y][x] == 6) {
                var water = new Water(x, y);
                waterArr.push(water);
                waterHashiv++;
            } else if (matrix[y][x] == 7) {
                var waterEater = new WaterEater(x, y);
                waterEaterArr.push(waterEater);
                waterEaterHashiv++;
            }
        }
    }
}

creatingObjects();
function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].eat();
        }
    }
    if (lavaArr[0] !== undefined) {
        for (var i in lavaArr) {
            lavaArr[i].mul();
        }
    }
    if (hrshejArr[0] !== undefined) {
        for (var i in hrshejArr) {
            hrshejArr[i].eat();
        }
    }
    if (waterArr[0] !== undefined) {
        for (var i in waterArr) {
            waterArr[i].mul();
        }
    }
    if (waterEaterArr[0] !== undefined) {
        for (var i in waterEaterArr) {
            waterEaterArr[i].eat();
        }

    }
    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        predatorCounter: predatorHashiv,
        lavaCounter: lavaHashiv,
        hrshejCounter: hrshejHashiv, 
        waterCounter: waterHashiv,
        waterEaterCounter: waterEaterHashiv
    }

    
    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);

}
setInterval(game, 500); 

function kill() {
    grassArr = [];
    grassEaterArr = []
    predatorArr = []
    lavaArr = []
    hrshejArr = []
    waterArr = []
    waterEaterArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    grassHashiv = 0; 
    grassEaterHashiv = 0; 
    predatorHashiv = 0;
    lavaHashiv = 0;
    hrshejHashiv = 0;
    waterHashiv = 0;
    waterEaterHashiv = 0;
    io.sockets.emit("send matrix", matrix);
}


function addGrass() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0 || matrix[y][x] == 6) {
            grassHashiv++; 
            matrix[y][x] = 1;
            var gr = new Grass(x, y, 1);
            grassArr.push(gr);
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
        if (matrix[y][x] == 0 || matrix[y][x] == 1) {
            grassEaterHashiv++; 
            matrix[y][x] = 2;
            var grassEater = new GrassEater(x, y, 2);
            grassEaterArr.push(grassEater);
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addPredator() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
        if (matrix[y][x] == 0 || matrix[y][x] == 1) {
            predatorHashiv++; 
            matrix[y][x] = 3;
            var predator = new Predator(x, y, 3);
            predatorArr.push(predator);
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addLava() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
        if (matrix[y][x] == 0 || matrix[y][x] == 1) {
            lavaHashiv++; 
            matrix[y][x] = 4;
            var lava = new Lava(x, y, 4);
            lavaArr.push(lava);
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addHrshej() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
        if (matrix[y][x] == 0 || matrix[y][x] == 1 || matrix[y][x] == 4) {
            hrshejHashiv++; 
            matrix[y][x] = 5;
            var hrshej = new Hrshej(x, y, 5);
            hrshejArr.push(hrshej);
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addWater() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
        if (matrix[y][x] == 0 || matrix[y][x] == 4) {
            waterHashiv++; 
            matrix[y][x] = 6;
            var water = new Water(x, y, 6);
            waterArr.push(water);
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addWaterEater() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
        if (matrix[y][x] == 0 || matrix[y][x] == 1 || matrix[y][x] == 6) {
            waterEaterHashiv++; 
            matrix[y][x] = 7;
            var waterEater = new WaterEater(x, y, 7);
            waterEaterArr.push(waterEater);
        }
    }
    io.sockets.emit("send matrix", matrix);
}
io.on('connection', function (socket) {
    creatingObjects();
    socket.on("kill", kill);
    socket.on("addGrass", addGrass);
    socket.on("addGrassEater", addGrassEater);
    socket.on("addPredator", addPredator);
    socket.on("addLava", addLava);
    socket.on("addHrshej", addHrshej);
    socket.on("addWater", addWater);
    socket.on("addWaterEater", addWaterEater);
});