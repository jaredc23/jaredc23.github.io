'use strict'

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

function draw() {
  var width = document.getElementById('nav-canvas').width;
  var height = document.getElementById('nav-canvas').height;
  var ctx = document.getElementById('nav-canvas').getContext('2d');
  /*
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, 300, 300); // clear canvas

  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
  ctx.save();
  ctx.translate(150, 150);

  // Earth
  var time = new Date();
  ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
  ctx.translate(105, 0);
  ctx.fillRect(0, -12, 40, 24); // Shadow
  ctx.drawImage(earth, -12, -12);

  // Moon
  ctx.save();
  ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds());
  ctx.translate(0, 28.5);
  ctx.drawImage(moon, -3.5, -3.5);
  ctx.restore();

  ctx.restore();
  
  ctx.beginPath();
  ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Earth orbit
  ctx.stroke();
 
  ctx.drawImage(sun, 0, 0, 300, 300);*/

  

// Wall
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, width, height); // clear canvas

  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
  ctx.save();
  
  ctx.clearRect(0,0,width, height);
  if(document.getElementById('nav-canvas').height == 190)
    ctx.translate(0, 80);
  else
    ctx.translate(0, 50);
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.strokeStyle = 'rgba(0, 153, 255, 1)';

  ctx.beginPath();
  ctx.arc(0, 0, 20, 0, 2 * Math.PI);
  ctx.moveTo(0,-20);
  ctx.lineTo(0,20);
  ctx.moveTo(-20,0);
  ctx.lineTo(20,0);
  ctx.stroke();
  ctx.translate(0.5, 0.5);
  ctx.restore();

  window.requestAnimationFrame(draw);
}

init();