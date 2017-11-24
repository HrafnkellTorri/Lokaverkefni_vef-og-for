"use strict";

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var ballRadius = 30;

var playerHeight = 20;
var playerWidth = 20;
var playerX = (canvas.width-playerWidth)/2;
var playerY = canvas.height-playerHeight;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;


var Ball = {

    create : function (ball_x, ball_y,ball_dx,ball_dy,ball_color)
    {
        var newBall = Object.create(this);
        newBall.x = ball_x;
        newBall.y = ball_y;
        newBall.dx = ball_dx;
        newBall.dy = ball_dy;
        newBall.color = ball_color;
        return newBall;
    },

    drawBall : function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    },

    checkboundaries : function() {
        if(this.x + this.dx > canvas.width-ballRadius || this.x + this.dx < ballRadius) {
            this.dx = -this.dx;
            this.y += 1;
        }

        if(this.y + this.dy > canvas.height-ballRadius || this.y + this.dy < ballRadius) {
            this.dy = -this.dy;
            this.x -= 1;
        }


        this.x += this.dx;
        this.y += this.dy;

    }
};

var ball1 = Ball.create(500,100,1,3,"red");
var ball2 = Ball.create(111,250,5,2,"green");

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball1.checkboundaries();
    ball2.checkboundaries();
    ball1.drawBall();
    ball2.drawBall();
    drawplayer();
    playerControler();
}


function drawplayer() {
    ctx.beginPath();
    ctx.rect(playerX, playerY, playerWidth, playerHeight);
    ctx.fillStyle = "#9925EE";
    ctx.fill();
    ctx.closePath();
}

function playerControler()
{
    if(rightPressed && playerX < canvas.width - playerWidth - 3) {
        playerX += 7;
    }
    else if(leftPressed && playerX > 2) {
        playerX -= 7;
    }
    else if(upPressed && playerY > 4) {
        playerY -= 7;
    }
    else if(downPressed && playerY < canvas.height - 3 - playerHeight) {
        playerY += 7;
    }
}

function keyDownHandler(e) 
{
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

function keyUpHandler(e) 
{
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

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

setInterval(draw, 10);