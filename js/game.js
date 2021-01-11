const canvas = document.getElementById("canvasID");
const ctx = canvas.getContext("2d");

let x = 10;
let y = 10;
let boolX = false;
let boolY = false;

function GameLoop(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "green";
    ctx.fillRect(x, y, 100, 100);
    
    if(x + 100 >= canvas.width || x <= 0)
    {
        boolX = !boolX;
        ctx.fillStyle = "red";
    }
    if(y + 100 >= canvas.height || y <= 0)
    {
        boolY = !boolY;
        ctx.fillStyle = "blue";
    }

    if(boolX == false)
    {
        x += 2;
    }
    else
    {
        x -= 2;
    }

    if(boolY == false)
    {
        y += 1.5;
    }
    else
    {
        y -= 1.5;
    }
}


setInterval(GameLoop, 1000 / 60);