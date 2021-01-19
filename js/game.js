const canvas = document.getElementById("canvasID");
const ctx = canvas.getContext("2d");


canvas.width = document.documentElement.clientWidth || document.body.clientWidth;
canvas.height = document.documentElement.clientHeight || document.body.clientHeight;

function startup() {
    canvas.addEventListener("touchstart", handleStart, false);
    canvas.addEventListener("touchend", handleEnd, false);
    canvas.addEventListener("touchcancel", handleCancel, false);
    canvas.addEventListener("touchmove", handleMove, false);
  }


function handleStart(evt) {
    evt.preventDefault();
    console.log("touchstart.");
    
    var touches = evt.changedTouches;
  
    RectCreate(5, 5, 50, 50, "blue", 10, 10);
}

function RectCreate(x, y, w, h, color, dw, dy)
{
    let obj = {
        x: x,
        y: y,
        w: w,
        h: h,
        color: color,
        dw: dw,
        dy: dy,
        draw: RectDraw
    }
    listRect.join(obj);
    return obj
}

let rect = RectCreate(10, 10, 100, 100, "red", 2, 2);
let rect2 = RectCreate(200, 200, 70, 70, "green", 4, 4);

let listRect = [
    rect,
    rect2
]



function GameLoop(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //rect.draw();
    //rect2.draw();

    /*for(let i = 0; i < listRect.length; i++)    //for
    {
        listRect[i].draw;
    }*/

    for(const obj of listRect)  //foreach
    {
        obj.draw()
    }

    /*listRect.forEach((obj) => {obj.draw() }) //foreach*/
    
}

function RectDraw()
{
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);

    if(this.x + this.w >= canvas.width || this.x <= 0)
    {
        this.dw *= -1;
    }
    if(this.y + this.h >= canvas.height || this.y <= 0)
    {
        this.dy *= -1;
    }

    this.x += this.dw;
    this.y += this.dy;
}



setInterval(GameLoop, 1000 / 60);
