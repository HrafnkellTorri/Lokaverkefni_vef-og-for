"use strict";
var alert;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var difficulty = 6;

var rightPressed = false;
var leftPressed = false;
var upPressed = false; 
var downPressed = false;

var d_Pressed = false;
var a_Pressed = false;
var w_Pressed = false; 
var s_Pressed = false;

var rawplayer1Score = 0;
var trueplayer1Score = 0;

//saving
var playerScore;
var gameResult = {};
var highscoreList = [];

var Ball = {

    create : function (ball_x, ball_y,ball_dx,ball_dy,ball_rad,ball_color)
    {
        var newFoe = Object.create(this);
        newFoe.x = ball_x;
        newFoe.y = ball_y;
        newFoe.dx = ball_dx;
        newFoe.dy = ball_dy;
        newFoe.ballRadius = ball_rad;
        newFoe.color = ball_color;
        return newFoe;
    },


    drawBall : function()
    {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

    },

    checkboundaries : function() 
    {
        if (Player1.PlayerAndCircleCollision(this)) 
        {
            alert("Player 1 DIED!");
            toHighscoreList();
            restartGame();
        } 
        else if (Player2.PlayerAndCircleCollision(this)) 
        {
            alert("PLAYER 2 DIED!");
            toHighscoreList();
            restartGame();
        } 
        if(this.x + this.dx > canvas.width-this.ballRadius || this.x + this.dx < this.ballRadius) {
            this.dx = -this.dx;
            this.ballRadius += 1;
        }

        if(this.y + this.dy > canvas.height-this.ballRadius || this.y + this.dy < this.ballRadius) {
            this.dy = -this.dy;
            this.ballRadius += 0.5;
        }

        this.x += this.dx;
        this.y += this.dy;
    }
};


var Player = {

    create : function (Player_x, Player_y,Player_width,Player_Height,Player_Color,Player_ID)
    {
        var newPlayer = Object.create(this);
        newPlayer.x = Player_x;
        newPlayer.y = Player_y;
        newPlayer.width = Player_width;
        newPlayer.height = Player_Height;
        newPlayer.id = Player_ID;
        newPlayer.color = Player_Color;
        return newPlayer;
    },

    drawplayer : function() 
    {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
    },

    PlayerAndCircleCollision : function(ball) 
    {
        var distX = Math.abs(ball.x - this.x - this.width / 2.2);
        var distY = Math.abs(ball.y - this.y - this.height / 2.2);

        if (distX > (this.width / 2 + ball.ballRadius)) 
        {
            return false;
        }
        if (distY > (this.height / 2 + ball.ballRadius)) 
        {
            return false;
        }
        if (distX <= (this.width / 2)) {
            return true;
        }
        if (distY  <= (this.height / 2)) {
            return true;
        }

        var rx = distX - this.width / 2;
        var ry = distY - this.height / 2;
        return (rx * rx + ry * ry <= (ball.ballRadius * ball.ballRadius));
    },

    playerControler : function()
    {


        if (rightPressed || leftPressed || upPressed || downPressed) 
        {   
        
            if (this.id === 1) {

                if(rightPressed  && this.x < canvas.width - this.width) {
                    this.x += 12;
                }
                else if(leftPressed  && this.x > 0) {
                    this.x -= 12;
                }
                else if(upPressed  && this.y > 0) {
                    this.y -= 12;
                }
                else if(downPressed  && this.y < canvas.height - this.height) {
                    this.y += 12;
                }

            }
        }

        if (d_Pressed || a_Pressed || w_Pressed || s_Pressed) 
        { 
            if (this.id === 2) {

                if(d_Pressed  && this.x < canvas.width - this.width) {
                    this.x += 12;
                }
                else if(a_Pressed  && this.x > 0) {
                    this.x -= 12;
                }
                else if(w_Pressed  && this.y > 0) {
                    this.y -= 12;
                }
                else if(s_Pressed  && this.y < canvas.height - this.height) {
                    this.y += 12;
                }

            }
        }

        score(); 
      }
};

var Player1 = Player.create(30,50,40,40,"#1057e5",1);
var Player2 = Player.create(50,50,40,40,"#e51b39",2);
var ball1 = Ball.create(Math.random() * 500 + 30,Math.random() * 500 + 30,-difficulty,difficulty,30,randomColor());
var ball2 = Ball.create(Math.random() * 500 + 30,Math.random() * 500 + 30,difficulty,difficulty,30,randomColor());
var ball3 = Ball.create(Math.random() * 500 + 30,Math.random() * 500 + 30,3,3,30,randomColor());
var ball4 = Ball.create(Math.random() * 500 + 30,Math.random() * 500 + 30,3,-3,30,randomColor());
var ball5 = Ball.create(Math.random() * 500 + 30,Math.random() * 500 + 30,difficulty,difficulty,30,randomColor());
var ball6 = Ball.create(Math.random() * 500 + 30,Math.random() * 500 + 30,difficulty,difficulty,30,randomColor());

function draw() 
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    DifficultySettings();
    spawnBalls();
    toHighscoreList(); 
    Player1.PlayerAndCircleCollision(ball1);
    Player1.drawplayer();
    Player1.playerControler();
    Player2.PlayerAndCircleCollision(ball1);
    Player2.drawplayer();
    Player2.playerControler();
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

    if(e.keyCode == 68) {
        d_Pressed = true;
    }
    else if(e.keyCode == 65) {
        a_Pressed = true;
    }
    else if(e.keyCode == 87) {
        w_Pressed = true;
    }
    else if(e.keyCode == 83) {
        s_Pressed = true;
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

    if(e.keyCode == 68) {
        d_Pressed = false;
    }
    else if(e.keyCode == 65) {
        a_Pressed = false;
    }
    else if(e.keyCode == 87) {
        w_Pressed = false;
    }
    else if(e.keyCode == 83) {
        s_Pressed = false;
    }
}

function DifficultySettings()
{

    var num = Math.round(rawplayer1Score / 100);
    
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

function restartGame()
{
    difficulty = 6;
    rawplayer1Score = 0;
    trueplayer1Score = 0;
    ball1.x = Math.random() * 500 + 20;
    ball2.x = Math.random() * 500 + 20;
    ball1.y = Math.random() * 500 + 20;
    ball2.y = Math.random() * 500 + 20;
    rightPressed = false;
    leftPressed = false;
    upPressed = false; 
    downPressed = false;
    ball1.ballRadius = 30;
    ball2.ballRadius = 30;
}

function toHighscoreList() {
    var num = Math.round(rawplayer1Score / 100);
    var spacing = 180;
    playerScore = num; 
    gameResult = { score: playerScore};
    highscoreList.push(gameResult);
 
    highscoreList.sort(function(a,b) { return (b.score - a.score ); });
    localStorage.setItem('gameResult', JSON.stringify(gameResult));

    if(highscoreList[0].score > 9)
    {
        spacing = 200;
    }
    if(highscoreList[0].score > 99)
    {
        spacing = 220;
    }
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Points: " + num ,canvas.width - 1070,40);
    ctx.fillText("HighScore: " + highscoreList[0].score,canvas.width - spacing,40);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);



setInterval(draw, 20);