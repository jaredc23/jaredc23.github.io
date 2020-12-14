'use strict'

const currCanvas = document.getElementById('nav-canvas'),
      computedStyleValueSpan = document.getElementById('computedstylevalue');
const computedStyleObj = getComputedStyle(currCanvas);

window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      document.getElementById("navBar").style.padding = "30px 10px";
      document.getElementById("logo").style.fontSize = "25px";
      document.getElementById("navBar").style.boxShadow = "0 20px 20px -2px rgba(0,0,0,.4)";
      document.getElementById("navBar-right").style.fontSize = "30px";
      document.getElementById("nav-canvas").style.height = "109px";
    } else {
      document.getElementById("navBar").style.padding = "70px 10px";
      document.getElementById("logo").style.fontSize = "60px";
      document.getElementById("navBar").style.boxShadow = "0 3px 3px -2px rgba(0,0,0,.2)";
      document.getElementById("navBar-right").style.fontSize = "50px";
      document.getElementById("nav-canvas").style.height = "189px";
    }
};

function navBarOnClick(id)
{
    document.getElementsByClassName('active')[0].classList.toggle('active');
    document.getElementById(id).classList.toggle('active');
}

var sun = new Image();
var moon = new Image();
var earth = new Image();

function init() {
  sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
  moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
  earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
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

function random(low, high) //Random number inclusive
{
  return Math.floor(Math.random() * (high+1)) + low;
}

var navWidth = document.getElementById('nav-canvas').width/devicePixelRatio;
var navHeight = document.getElementById('nav-canvas').height/devicePixelRatio;


let traces = []
for(var i = 0; i < 10; i++)
{
  traces.push(new Trace(random(navWidth/20, navWidth-navWidth/20), random(navHeight/20, navHeight-navHeight/20),0,0,navWidth,navHeight,-1,7,random(1,20)/20,"#FFDF00", "#000000"));
}

let points = [];
for(var i = 0; i < 3; i++)
{
  points[i] = {x:random(navWidth/20, navWidth-navWidth/20), y: random(navHeight/20, navHeight-navHeight/20), r:random(0,Math.PI*2)};
}
let image = new Image();
image.src = 'images/ic.png';
image.crossOrigin = "Anonymous";
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

    for(var i = 0; i < traces.length; i++)
      traces[i].drawRandom(ctx);

    //ctx.restore();
    for(var i = 0; i < traces.length; i++)
      traces[i].calculations(ctx);

    for(var i = 0; i < traces.length; i++)
      if(traces[i].flag)
        traces[i] = new Trace(random(navWidth/20, navWidth-navWidth/20), random(navHeight/20, navHeight-navHeight/20),0,0,navWidth,navHeight,-1,7,random(1,20)/20,"#FFDF00", "#000000");

    for(var i = 0; i <3; i++)
    {
      ctx.drawImage(image, points[i].x, points[i].y);
    }    
    //t.calculateCollisions(ctx);
    ctx.restore();
  }
  //window.requestAnimationFrame(draw);
}

setInterval(function()
{
  window.requestAnimationFrame(draw);
}, 1);

init();