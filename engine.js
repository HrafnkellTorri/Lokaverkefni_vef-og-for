"use strict";
var alert;


var canvas = document.getElementById("myCanvas");
var textColor = randomColor();
var ctx = canvas.getContext("2d");

var difficulty = 6;

var playerHeight = 40;
var playerWidth = 40;
var playerX = (canvas.width-playerWidth)/2;
var playerY = canvas.height-playerHeight;

var rightPressed = false;
var leftPressed = false;
var upPressed = false; 
var downPressed = false;

var player1color = randomColor(); 
var rawplayer1Score = 0;
var trueplayer1Score = 0;

var Ball = {

    create : function (ball_x, ball_y,ball_dx,ball_dy,ball_rad,ball_color)
    {
        var newBall = Object.create(this);
        newBall.x = ball_x;
        newBall.y = ball_y;
        newBall.dx = ball_dx;
        newBall.dy = ball_dy;
        newBall.ballRadius = ball_rad;
        newBall.color = ball_color;
        return newBall;
    },

    drawBall : function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "black";
    ctx.stroke();
    ctx.closePath();
    },

    checkboundaries : function() {
        if(this.x + this.dx > canvas.width-this.ballRadius || this.x + this.dx < this.ballRadius) {
            this.dx = -this.dx;
            this.ballRadius += 1;
            
        }
        if(this.y + this.dy > canvas.height-this.ballRadius || this.y + this.dy < this.ballRadius) {
            this.dy = -this.dy;
            this.ballRadius += 0.5;
            
        }
        if (PlayerAndCircleCollision(this)) 
        {

            setTimeout(alert("Hello "), 15000);
            location.reload();
        } 
        else 
        {
            ctx.fillStyle = "skyblue";
        }
        this.x += this.dx;
        this.y += this.dy;
    }
};

var ball1 = Ball.create(Math.random() * 500 + 20,Math.random() * 500 + 20,-difficulty,difficulty,30,randomColor());
var ball2 = Ball.create(Math.random() * 500 + 20,Math.random() * 500 + 20,difficulty,difficulty,30,randomColor());
var ball3 = Ball.create(Math.random() * 500 + 20,Math.random() * 500 + 20,3,3,30,randomColor());
var ball4 = Ball.create(Math.random() * 500 + 20,Math.random() * 500 + 20,3,-3,30,randomColor());
var ball5 = Ball.create(Math.random() * 500 + 20,Math.random() * 500 + 20,difficulty,difficulty,30,randomColor());
var ball6 = Ball.create(Math.random() * 500 + 20,Math.random() * 500 + 20,difficulty,difficulty,30,randomColor());

function draw() 
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawplayer();
    playerControler();
    scoreDrawingAndDifficultySettings();
    spawnBalls();
}

function drawplayer() {
    ctx.beginPath();
    ctx.rect(playerX, playerY, playerWidth, playerHeight);
    ctx.fillStyle = player1color;
    ctx.fill();
    ctx.rect(playerX, playerY, playerWidth, playerHeight);
    ctx.fillStyle = "black";
    ctx.lineWidth = 3.5;
    ctx.stroke();
    ctx.closePath();
}

function PlayerAndCircleCollision(ball) {
    var distX = Math.abs(ball.x - playerX - playerWidth / 2.2);
    var distY = Math.abs(ball.y - playerY - playerHeight / 2.2);

    if (distX > (playerWidth / 2 + ball.ballRadius)) 
    {
        return false;
    }
    if (distY > (playerHeight / 2 + ball.ballRadius)) 
    {
        return false;
    }
    if (distX <= (playerWidth / 2)) {
        return true;
    }
    if (distY  <= (playerHeight / 2)) {
        return true;
    }

    var rx = distX - playerWidth / 2;
    var ry = distY - playerHeight / 2;
    return (rx * rx + ry * ry <= (ball.ballRadius * ball.ballRadius));
}

function playerControler()
{
    if (rightPressed || leftPressed || upPressed || downPressed) 
    {
        
        if(rightPressed && playerX < canvas.width - playerWidth - 3) {
            playerX += 14;
        }
        else if(leftPressed && playerX > 2) {
            playerX -= 14;
        }
        else if(upPressed && playerY > 4) {
            playerY -= 14;
        }
        else if(downPressed && playerY < canvas.height - 3 - playerHeight) {
            playerY += 14;
        }

        score(); 
    }

}

function spawnBalls()
{
    ball1.checkboundaries();
    ball2.checkboundaries();
    ball1.drawBall();
    ball2.drawBall();
    if(trueplayer1Score > 4)
    {
        ball3.drawBall();
        ball3.checkboundaries();
    }
    if(trueplayer1Score > 9)
    {
        ball4.drawBall();
        ball4.checkboundaries();
    }
    if(trueplayer1Score > 14)
    {
        ball5.drawBall();
        ball5.checkboundaries();
    }
    if(trueplayer1Score > 19)
    {
        ball6.drawBall();
        ball6.checkboundaries();
    }
}

function randomColor() {
  var letters = '0123456789ACDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
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

function scoreDrawingAndDifficultySettings()
{
    ctx.font = "30px Arial";
    ctx.fillStyle = textColor;
    var num = Math.round(rawplayer1Score / 100);
    ctx.fillText("Points: " + num + " " + difficulty + " ",10,50);
    if(num > 5)
    {
        difficulty = 10;
        trueplayer1Score = num;
    }
    if(num > 10)
    {
        difficulty = 20;
        trueplayer1Score = num;
    }
    if(num > 15)
    {
        difficulty = 30;
        trueplayer1Score = num;
    }
    if(num > 20)
    {
        difficulty = 45;
        trueplayer1Score = num;
    }
}

function score()
{
    rawplayer1Score++;
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

setInterval(draw, 20);