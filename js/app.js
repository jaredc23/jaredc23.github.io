'use strict'

window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      document.getElementById("navBar").style.padding = "30px 10px";
      document.getElementById("logo").style.fontSize = "25px";
      document.getElementById("navBar").style.boxShadow = "0 20px 20px -2px rgba(0,0,0,.4)";
      document.getElementById("navBar-right").style.fontSize = 30;
    } else {
      document.getElementById("navBar").style.padding = "70px 10px";
      document.getElementById("logo").style.fontSize = "60px";
      document.getElementById("navBar").style.boxShadow = "0 3px 3px -2px rgba(0,0,0,.2)";
      document.getElementById("navBar-right").style.fontSize = 50;
    }
};

function navBarOnClick(id)
{
    document.getElementsByClassName('active')[0].classList.toggle('active');
    document.getElementById(id).classList.toggle('active');
}