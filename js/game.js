const canvas = document.getElementById("canvasID");
const ctx = canvas.getContext("2d");

let x = 10;
let y = 10;
let xMove = 2;
let yMove = 2;


function GameLoop(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "green";
    ctx.fillRect(x, y, 100, 100);
    
    if(x + 100 >= canvas.width || x <= 0)
    {
        xMove *= -1;
    }
    if(y + 100 >= canvas.height || y <= 0)
    {
        yMove *= -1;
    }

    x += xMove;
    y += yMove;
}



setInterval(GameLoop, 1000 / 60);
