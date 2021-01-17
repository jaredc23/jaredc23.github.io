'use strict'

const titleCanvas = document.getElementById('titleScreen'),
      TcomputedStyleValueSpan = document.getElementById('computedstylevalue');
const TcomputedStyleObj = getComputedStyle(titleCanvas);

let tcanvas = document.getElementById("titleScreen");
let tctx = document.getElementById('titleScreen').getContext('2d');

let trect = tcanvas.getBoundingClientRect();

// increase the actual size of our canvas
tcanvas.width = trect.width * devicePixelRatio;
tcanvas.height = trect.height * devicePixelRatio;

// ensure all drawing operations are scaled
tctx.scale(devicePixelRatio, devicePixelRatio);

// scale everything down using CSS
tcanvas.style.width = trect.width + 'px';
tcanvas.style.height = trect.height + 'px';

function random(low, high) //Random number inclusive
{
  return Math.floor(Math.random() * (high+1)) + low;
}

function tdraw()
{
  if(document.hasFocus)
  {
    ctx.width  = window.innerWidth;
    ctx.height = window.innerHeight;

    var twidth = document.getElementById('titleScreen').width/devicePixelRatio;
    var theight = document.getElementById('titleScreen').height/devicePixelRatio;
    
    tctx.globalCompositeOperation = 'destination-over';
    tctx.clearRect(0, 0, twidth, theight); // clear canvas
    tctx.save();
    tctx.fillStyle = '#000000';
    tctx.beginPath();
    tctx.rect(0,0,700, 2500);
    tctx.fill();
    tctx.stroke();

    ctx.restore();
  }
}

setInterval(function()
{
  window.requestAnimationFrame(tdraw);
}, 1);