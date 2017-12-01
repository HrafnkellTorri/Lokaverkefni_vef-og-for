"use strict";

var console;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var running = true;

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

var rawplayer2Score = 0;
var trueplayer2Score = 0;

var P1lifes = 5;
var P2lifes = 5;

var lastDeath = "";

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
            timer1=0;
            P1lifes--;
            lastDeath="Player 1 Died";
            restartGame();
        } 
        else if (Player2.PlayerAndCircleCollision(this)) 
        {
            timer1=0;
            P2lifes--;
            lastDeath="Player 2 Died";
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
                scorep1(); 
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
                scorep2(); 
            }
        }
        
      }
};

var Player1 = Player.create(canvas.width/2+350,720,40,40,"#1057e5",1);
var Player2 = Player.create(canvas.width/2-350,720,40,40,"#e51b39",2);
var ball1 = Ball.create(Math.random() * 1000 + 30,Math.random() * 500 + 30,-difficulty,-difficulty,30,randomColor());
var ball2 = Ball.create(Math.random() * 1000 + 30,Math.random() * 500 + 30,difficulty,-difficulty,30,randomColor());
var ball3 = Ball.create(Math.random() * 500 + 30,Math.random() * 500 + 30,3,3,30,randomColor());
var ball4 = Ball.create(Math.random() * 500 + 30,Math.random() * 500 + 30,3,-3,30,randomColor());
var ball5 = Ball.create(Math.random() * 500 + 30,Math.random() * 500 + 30,difficulty,difficulty,30,randomColor());
var ball6 = Ball.create(Math.random() * 500 + 30,Math.random() * 500 + 30,difficulty,difficulty,30,randomColor());

function draw() 
{
    checkForreload();
    if(P1lifes > 0 && P2lifes > 0)
    {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    DifficultySettings();
    spawnBalls();
    time1(); 
    drawControlers();
    drawDeathscreen();
    }
    else if(P1lifes === 0)
    {
        ctx.fillText("Player 2 Wins!",canvas.width-655,canvas.height/2-100);
        running = false;
    }
    else if(P2lifes === 0)
    {
        ctx.fillText("Player 1 Wins!",canvas.width-655,canvas.height/2-100);
        running = false;
    }
    else
    {
        console.log("Þeir dóu á nákvæmlega sama tíma :/");
    }
}

function checkForreload()
{
if(running === false && timer1 > 5) 
    {
        location.reload();
    }
}

function drawControlers()
{
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
    if(trueplayer2Score > 9)
    {
        ball4.drawBall();
        ball4.checkboundaries();
    }
    if(trueplayer1Score > 14)
    {
        ball5.drawBall();
        ball5.checkboundaries();
    }
    if(trueplayer2Score > 19)
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

function drawDeathscreen() 
{
    if(timer1 < 4)
    {
        if(timer1 % 2 === 0)
        {
        death(lastDeath,"red");
        }
        else if(timer1 % 2 === 1)
        {
        death(lastDeath,"white");
        }
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

function scorep1()
{
    rawplayer1Score++;
}
function scorep2()
{
    rawplayer2Score++;
}

function restartGame()
{
    difficulty = 6;
    rawplayer1Score = 0;
    trueplayer1Score = 0;
    rawplayer2Score = 0;
    trueplayer2Score = 0;
    ball1.x = Math.random() * 500 + 20;
    ball2.x = Math.random() * 500 + 20;
    ball1.y = Math.random() * 500 + 20;
    ball2.y = Math.random() * 500 + 20;
    rightPressed = false;
    leftPressed = false;
    upPressed = false; 
    downPressed = false;
    a_Pressed = false;
    w_Pressed = false;
    d_Pressed = false;
    s_Pressed = false;
    ball1.ballRadius = 30;
    ball2.ballRadius = 30;
}

function time1() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Time Survived : " + timer1 ,canvas.width/2-125,30);
    ctx.fillText("P2 Lifes Left: " + P2lifes ,canvas.width/2-525,30);
    ctx.fillText("P1 Lifes Left: " + P1lifes ,canvas.width/2+325,30);

}
var timer1 = 0;
setInterval(function () {
  ++timer1;
}, 1000);

function death(name,color) {
    ctx.font = "30px Arial";
    ctx.fillStyle = color;
    ctx.fillText(lastDeath,canvas.width-650,canvas.height/2);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);



setInterval(draw, 20);