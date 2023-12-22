const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class snakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

// update screen 7 time in a second, it becomes faster if we increase speed from 7 to another bigger number
let speed = 7;

let tileCount = 20;
// tileSize = 400/20-2 -> 18  
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = []; // a const array becoz we'renever remove this array we'll only modify
let tailLength = 2; // when snake move it'll automatically have 2 tail pieces


let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

function drawGame(){
    changeSnakePosition();
    let result = isGameover();
    if(result){
        return ;
    }

    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();

    drawScore();
    // update screen 7 time in a second 
    setTimeout(drawGame, 1000/ speed);
}

function isGameover(){
    let gameover = false;

    if(yVelocity === 0 && xVelocity === 0){
        return false;
    }

    //walls
    if(headX < 0){
        gameover = true;
    }

    else if(headX === tileCount){
        gameover = true;
    }

    else if(headY < 0){
        gameover = true;
    }

    else if(headY === tileCount){
        gameover = true;
    }

    for(let i=0; i < snakeParts.length; i++){
        let snakeBody = snakeParts[i];
        if(snakeBody.x === headX && snakeBody.y === headY){
            gameover = true;
            break;
        }

    }

    if(gameover){
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";

        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    }

    return gameover;
}
function drawScore(){
    ctx.fillStyle = 'white';
    ctx.font = "10px Verdana";
    ctx.fillText("Score " + score, canvas.width-50, 10);
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    // above two line paint black color from left to right in our canvas basically give black background  
}

function drawSnake(){
    // console.log('hey');
    //ctx.fillStyle = 'orange';
    //ctx.fillRect(headX * tileCount, headY * tileCount, tileSize,tileSize);  //fill rectangle
    
    ctx.fillStyle = 'green';
    for(let i=0;i< snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new snakePart(headX, headY));//put an item at the end of the list next to the head
    if(snakeParts.length > tailLength){ 
        snakeParts.shift();//remove the furthest item from the snake parts if we have more than our tail size
    }
    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize,tileSize);  //fill rectangle
}


function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;

}

function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX *tileCount, appleY * tileCount, tileSize, tileSize);
}


//if snake and apple collide draw apple on a new random position
function checkAppleCollision(){
    if(appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        //if there is a collision increase tail length
        tailLength++;
        score++;
    }
}

//events to listen keyboard command
document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    //up-> key code for up is 38 you can google d/f keycodes
    if(event.keyCode == 38){
        //hey if you're moving down then you're not allowed to move up becoz you'll crash onto your own body
        if(yVelocity == 1)
        return; //by return you'll exit the  keyDown function
        yVelocity = -1;
        xVelocity = 0;
    }

    //down
    if(event.keyCode == 40){
        //hey if you're moving up then you're not allowed to move down becoz you'll crash onto your own body
        if(yVelocity == -1)
        return; //by return you'll exit the  keyDown function
        yVelocity = 1;
        xVelocity = 0;
    }

    //left
    if(event.keyCode == 37){
        //hey if you're moving right then you're not allowed to move left becoz you'll crash onto your own body
        if(xVelocity == 1)
        return; //by return you'll exit the  keyDown function
        yVelocity = 0;
        xVelocity = -1;
    }

    //right
    if(event.keyCode == 39){
        //hey if you're moving left then you're not allowed to move right becoz you'll crash onto your own body
        if(xVelocity == -1)
        return; //by return you'll exit the  keyDown function
        yVelocity = 0;
        xVelocity = 1;
    }
}

// function call 
drawGame();