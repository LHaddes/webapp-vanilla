const canvas = document.getElementById("canvasID");
const ctx = canvas.getContext("2d");

let x = 10;
let y = 10;
let boolX = false;
let boolY = false;

let x2 = 300;
let y2 = 300;
let boolX2 = true;
let boolY2 = false;


function GameLoop(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function FirstSquare()
{
    ctx.fillStyle = "green";
    ctx.fillRect(x, y, 100, 100);
    
    if(x + 100 >= canvas.width || x <= 0)
    {
        boolX = !boolX;
    }
    if(y + 100 >= canvas.height || y <= 0)
    {
        boolY = !boolY;
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

function SecondSquare()
{
    ctx.fillStyle = "red";
    ctx.fillRect(x2, y2, 100, 100);
    
    if(x2 + 100 >= canvas.width || x2 <= 0)
    {
        boolX2 = !boolX2;
        
    }
    if(y2 + 100 >= canvas.height || y2 <= 0)
    {
        boolY2 = !boolY2;
        
    }

    if(boolX2 == false)
    {
        x2 += 2;
    }
    else
    {
        x2 -= 2;
    }

    if(boolY2 == false)
    {
        y2 += 1.5;
    }
    else
    {
        y2 -= 1.5;
    }
}


setInterval(GameLoop, 1000 / 60);
setInterval(FirstSquare, 1000 / 60);
setInterval(SecondSquare, 1000 / 60);