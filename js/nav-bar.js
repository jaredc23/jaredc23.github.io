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
      document.getElementById("nav-canvas").style.height = "110px";
    } else {
      document.getElementById("navBar").style.padding = "70px 10px";
      document.getElementById("logo").style.fontSize = "60px";
      document.getElementById("navBar").style.boxShadow = "0 3px 3px -2px rgba(0,0,0,.2)";
      document.getElementById("navBar-right").style.fontSize = "50px";
      document.getElementById("nav-canvas").style.height = "190px";
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
  window.requestAnimationFrame(draw);
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

function draw() {

  ctx.width  = window.innerWidth;
  ctx.height = window.innerHeight;

  var width = document.getElementById('nav-canvas').width;
  var height = document.getElementById('nav-canvas').height;

  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, width, height); // clear canvas

  ctx.lineWidth = 200;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
  ctx.save();

  ctx.translate(0, map(parseInt(computedStyleObj.height), 110, 190, 40,0));
  
  ctx.clearRect(0,0,width, height);
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.strokeStyle = 'rgba(0, 153, 255, 1)';

  let t = new Trace(0,0,width,height,5,"#000000", "#FFFFFF");
  t.draw(ctx);
  ctx.fillRect(0,0,width,parseInt(computedStyleObj.height));

  ctx.translate(0.5, 0.5);
  ctx.restore();
  window.requestAnimationFrame(draw);
}

init();