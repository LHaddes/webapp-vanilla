const canvas = document.getElementById("canvasID");
const ctx = canvas.getContext("2d");


canvas.width = document.documentElement.clientWidth || document.body.clientWidth;
canvas.height = document.documentElement.clientHeight || document.body.clientHeight;
/*
let debugText = new Text();
debugText = document.getElementById('debug');
*/
let gyroscope = new Gyroscope({frequency: 60});

let gyroValue = {
    x: 0,
    y: 0,
    z: 0
}

let touchPos = {
    x: 0,
    y: 0
}


function startup() {

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    /*canvas.addEventListener("touchstart", handleStart, false);
    canvas.addEventListener("touchend", handleEnd, false);
    canvas.addEventListener("touchcancel", handleCancel, false);
    canvas.addEventListener("touchmove", handleMove, false);*/

    var rectCanvas = canvas.getBoundingClientRect();

    canvas.addEventListener("mouseup", releaseClick/*, e => {
        touchPos.x = e.clientWidth,
        touchPos.y = e.clientY}*/, false);

    gyroscope.addEventListener('reading', e => {
        gyroValue.x += gyroscope.x
        gyroValue.y += gyroscope.y
        gyroValue.z += gyroscope.z
        document.getElementById("gyro").innerHTML = Math.floor(gyroValue.x) + "<br>" + Math.floor(gyroValue.y) + "<br>" + Math.floor(gyroValue.z)
    });
}

gyroscope.start();
document.addEventListener("DOMContentLoaded", startup);


function releaseClick(evt) {
    evt.preventDefault();

    touchPos.x = evt.clientX;
    touchPos.y = evt.clientY

    console.log("x: " + touchPos.x + " ;  y:" + touchPos.y)
    
    var touches = evt.changedTouches;
    
        let color = RandomColor();
        console.log(color);

      /*  let x = Math.floor(Math.random() * 200);
        let posX = Math.floor(Math.random() * (canvas.width - x));
        let posY = Math.floor(Math.random() * (canvas.height - x));*/

        let speedX = Math.floor(Math.random() * 12) * (Math.round(Math.random()) * 2 - 1);
        let speedY = speedX * (Math.round(Math.random()) * 2 - 1);

        let radius = 10 + Math.random() * 20;
  /*
        let rect = RectCreate(touchPos.x, touchPos.y, x, x, color, speedX, speedY);
        listRect.push(rect);
*/
        let circle = CircleCreate(touchPos.x, touchPos.y, radius, speedX, speedY, color);
        listCircle.push(circle);
      

    
}

function RandomColor(){
    let colorList = [
        "10002b",
        "240046",
        "3c096c",
        "5a189a",
        "7b2cbf",
        "9d4edd",
        "c77dff",
        "e0aaff",
        "a564d3",
        "b66ee8",
        "c879ff",
        "d689ff",
        "e498ff",
        "f2a8ff",
        "ffb7ff",
        "ffc4ff",
        "ffc9ff",
        "ffceff",
        "b28dff",
        "bc98ff",
        "edf2fb",
        "e2eafc",
        "d7e3fc",
        "ccdbfd",
        "c1d3fe",
        "b6ccfe",
        "abc4ff"
    ]

    let color = '#' + colorList[Math.floor(Math.random() * colorList.length)];
    return color;
}

function RectCreate(x, y, w, h, color, dx, dy)
{
    let obj = {
        x: x,
        y: y,
        w: w,
        h: h,
        color: color,
        dx: dx,
        dy: dy,
        draw: RectDraw
    }
    return obj
}

function CircleCreate(x, y, radius, dx, dy, color) {
    let circle = {
        x: x,
        y: y,
        radius : radius,
        dx: dx,
        dy: dy,
        color : color,
        draw: CircleDraw
    };
    return circle
}

let rect = RectCreate(10, 10, 100, 100, RandomColor(), 2, 2);
let rect2 = RectCreate(200, 200, 70, 70, RandomColor(), 4, 4);

let listRect = [
    rect,
    rect2
]


let circle = CircleCreate(canvas.width / 2, canvas.height / 2, 50, 0, 0, RandomColor());

let listCircle = [
    circle
]



function GameLoop(){
    //debugText.textContent = "Debug console : ";
    //debugText.textContent += "xGyro : " + gyroValue.x + "  yGyro : " + gyroValue.y + "  zGyro : " + gyroValue.z;

    ctx.fillStyle = "black";
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
    for(const obj of listCircle)  //foreach
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
        this.dx *= -1;
    }
    if(this.y + this.h >= canvas.height || this.y <= 0)
    {
        this.dy *= -1;
    }

    this.x += this.dx;
    this.y += this.dy;
}

function CircleDraw() {

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    
    if (this.x + this.radius >= canvas.clientWidth) 
    {
        this.x = canvas.clientWidth - this.radius;
    }
    if (this.x - this.radius <= 0) 
    {
        this.x = 0 + this.radius;
    }

    if (this.y + this.radius >= canvas.clientHeight) 
    {
        this.y = canvas.clientHeight - this.radius;
    }
    if (this.y - this.radius <= 0) 
    {
        this.y = 0 + this.radius;
    }


    this.x += gyroValue.y;
    this.y += gyroValue.x / 2;
}



setInterval(GameLoop, 1000 / 60);
