var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/5;
var y = canvas.height-30;
var dx = 3;
var dy = -3;
var ballRadius = 30;


var playerHeight = 10;
var playerWidth = 75;
var playerX = (canvas.width-playerWidth)/2;
var playerY = canvas.height-playerHeight;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;


function checkboundaries(){
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
        ballRadius += 1;
    }

    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
        ballRadius += 1;
    }

    x += dx;
    y += dy;

}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawplayer();
    checkboundaries();
    if(rightPressed) {
        playerX += 7;
    }
    else if(leftPressed) {
        playerX -= 7;
    }
    else if(upPressed) {
        playerY -= 7;
    }
    else if(downPressed) {
        playery -= 7;
    }

}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawplayer() {
    ctx.beginPath();
    ctx.rect(playerX, playerY, playerWidth, playerHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}





document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 38) {
        upPressed = true;
    }
    else if(e.keyCode == 40) {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
    else if(e.keyCode == 38) {
        upPressed = false;
    }
    else if(e.keyCode == 40) {
        downPressed = false;
    }
}

setInterval(draw, 10);