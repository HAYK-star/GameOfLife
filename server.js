//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require("./modules/predator.js");
var Lava = require("./modules/Lava.js");
var Hrshej = require("./modules/Hrshej.js");
var Water = require("./modules/Water.js"); 
var Stone = require("./modules/Stone.js"); 
var StoneBracker = require("./modules/StoneBracker.js"); 
// var fs = require("fs");
let random = require('./modules/random.js');
//! Requiring modules  --  END

//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
predatorArr = [];
lavaArr = [];
hrshejArr = [];
waterArr = []; 
stoneArr = []; 
stoneBrackerArr = [];
matrix = [];
grassHashiv = 0;
grassEaterHashiv = 0;
predatorHashiv = 0;
lavaHashiv = 0;
hrshejHashiv = 0;
waterHashiv = 0; 
stoneHashiv = 0; 
stoneBrackerHashiv = 0; 
weath = "winter";
// var counter = 0; 
//! Setting global arrays  -- END

//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, Predator, Lava, Hrshej, Water, Stone, StoneBracker) {
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
    for (let i = 0; i < Stone; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 7;
    }
    for (let i = 0; i < StoneBracker; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 8;
    }
}
matrixGenerator(25, 25, 20, 5, 5, 5, 2, 0, 10);
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
                var stone = new Stone(x, y);
                stoneArr.push(stone);
                stoneHashiv++;
            } else if (matrix[y][x] == 8) {
                var stoneBracker = new StoneBracker(x, y);
                stoneBrackerArr.push(stoneBracker);
                stoneBrackerHashiv++;
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
    if (stoneArr[0] !== undefined) {
        for (var i in stoneArr) {
        }
    }
    if (stoneBrackerArr[0] !== undefined) {
        for (var i in stoneBrackerArr) {
            stoneBrackerArr[i].move();
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
        stoneCounter: stoneHashiv, 
        stoneBrackerCounter: stoneBrackerHashiv
    }

    
    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);

    // console.log(stoneArr[0].x, stoneArr[0].y);
}
setInterval(game, 500); 

function kill() {
    grassArr = [];
    grassEaterArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function addGrass() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y)
            grassArr.push(gr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            let grassEater = new GrassEater(x, y);
            grassEaterArr.push(grassEater);
            console.log(1);
        }
    }
    io.sockets.emit("send matrix", matrix);
}


///new



function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);


////

io.on('connection', function (socket) {
    creatingObjects();
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
});