'use strict'

let a = true;

//methods

function navscrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("navBar").style.padding = "20px 10px";
    document.getElementById("navBar").style.opacity = "75%";
    document.getElementById("logo").style.fontSize = "25px";
    document.getElementById("navBar").style.boxShadow = "0 20px 20px -2px rgba(0,0,0,.4)";
    document.getElementById("navBar-right").style.fontSize = "30px";
    document.getElementById("nav-canvas").style.height = "109px";
    document.getElementById("navBar").style.pointerEvents = "auto"
  } 
  else {
    document.getElementById("navBar").style.padding = "40px 10px";
    document.getElementById("logo").style.fontSize = "60px";
    document.getElementById("navBar").style.boxShadow = "0 3px 3px -2px rgba(0,0,0,.0)";
    document.getElementById("navBar-right").style.fontSize = "50px";
    document.getElementById("nav-canvas").style.height = "129px";
    document.getElementById("navBar").style.opacity = "0%"
    document.getElementById("navBar").style.backgroundColor = "rgba(0,0,0,0)";
    document.getElementById("navBar").style.pointerEvents = "none"
  }

};

function random(low, high) //Random number inclusive
{
  return Math.floor(Math.random() * (high+1)) + low;
}


function navBarOnClick(id)
{
  document.getElementsByClassName('activeb')[0].classList.toggle('activeb');
  document.getElementById(id).classList.toggle('activeb');
}

const currCanvas = document.getElementById('nav-canvas'),
      computedStyleValueSpan = document.getElementById('computedstylevalue');
const computedStyleObj = getComputedStyle(currCanvas);


function init() {
  //window.requestAnimationFrame(draw);
}

let canvas = document.getElementById("nav-canvas");
let ctx = document.getElementById('nav-canvas').getContext('2d');

// get current size of the canvas
let rect = canvas.getBoundingClientRect();

// increase the actual size of our canvas
canvas.width = rect.width * devicePixelRatio;
canvas.height = rect.height * devicePixelRatio;

// ensure all drawing operations are scaled
ctx.scale(devicePixelRatio, devicePixelRatio);

// scale everything down using CSS
canvas.style.width = rect.width + 'px';
canvas.style.height = rect.height + 'px';

function map(x, in_min, in_max, out_min, out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}



var navWidth = document.getElementById('nav-canvas').width/devicePixelRatio;
var navHeight = document.getElementById('nav-canvas').height/devicePixelRatio;


//let traces = []
//for(var i = 0; i < 10; i++)
//{
  //let t = /*traces.push(*/new TraceRunner(10,random(navWidth/20, navWidth-navWidth/20), random(navHeight/20, navHeight-navHeight/20),0,0,navWidth,navHeight,-1,7,random(1,20)/20,"#FFDF00", "#000000");
  let t = new TraceRunner(10, 0 , 0, navWidth, navHeight);
//}

let points = [];
for(var i = 0; i < 4; i++)
{
  points[i] = {x:random(navWidth/20, navWidth-navWidth/20)*5, y: random(navHeight/20, navHeight-navHeight/20)*5, r:random(0,360)};
}
let image = new Image();
image.src = 'https://image.flaticon.com/icons/png/512/17/17787.png';
image.crossOrigin = "Anonymous";
var flag = false;
image.onload = function()
{
  flag = true;
}
//let t = new Trace(700,100,0,0,navWidth,navHeight,-1,5,1,"#FFDF00", "#000000");

function draw() {
  if(document.hasFocus)
  {
    ctx.width  = window.innerWidth;
    ctx.height = window.innerHeight;

    var width = document.getElementById('nav-canvas').width;
    var height = document.getElementById('nav-canvas').height;

    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, width, height); // clear canvas
    ctx.save();

    for(var i = 0; i <4; i++)
    {
      ctx.scale(.2,.2);
      ctx.drawImage(image, points[i].x, points[i].y);
      ctx.scale(5,5);
    }
    
    t.draw(ctx);
    ctx.restore();
  }
}
/*
setInterval(function()
{
  window.requestAnimationFrame(draw);
}, 1);
*/
init();