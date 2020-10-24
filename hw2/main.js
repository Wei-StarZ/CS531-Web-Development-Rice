'use strict';
var stop1 = false;
var stop2 = false;
var stop3 = false;
var url = document.getElementById('img1').src.length - 1;
function setup() {
    document.getElementById('post1').addEventListener("click", handleButtonClick1);
    document.getElementById('post2').addEventListener("click", handleButtonClick2);
    document.getElementById('post3').addEventListener("click", handleButtonClick3);
    interval();
}
function interval() {
  setInterval(update1, Math.floor(Math.random() * 5) * 1000 + 1000);
  setInterval(update2, Math.floor(Math.random() * 5) * 1000 + 1000);
  setInterval(update3, Math.floor(Math.random() * 5) * 1000 + 1000);
}

function update1() {
  if (!stop1) {
    var img1 = document.getElementById('img1').src;
    document.getElementById('img1').src = img1.substring(0, url) + Math.floor(Math.random() * 5 + 10);
  }
}

function update2() {
  if (!stop2) {
    var img2 = document.getElementById('img2').src;
    document.getElementById('img2').src = img2.substring(0, url) + Math.floor(Math.random() * 5 + 20);
  }
}

function update3() {
  if (!stop3) {
    var img3 = document.getElementById('img3').src;
    document.getElementById('img3').src = img3.substring(0, url) + Math.floor(Math.random() * 5 + 30);
  }
}

function handleButtonClick1() {
  var x = document.getElementById('post1').innerHTML;
  if (x == "Stop") {
    stop1 = true;
    document.getElementById('post1').innerHTML = "Start";
  }
  else {
    stop1 = false;
    document.getElementById('post1').innerHTML = "Stop";
  }
}

function handleButtonClick2() {
  var x = document.getElementById('post2').innerHTML;
  if (x == "Stop") {
    stop2 = true;
    document.getElementById('post2').innerHTML = "Start";
  }
  else {
    stop2 = false
    document.getElementById('post2').innerHTML = "Stop";
  }
}

function handleButtonClick3() {
  var x = document.getElementById('post3').innerHTML;
  if (x == "Stop") {
    stop3 = true;
    document.getElementById('post3').innerHTML = "Start";
  }
  else {
    stop3 = false;
    document.getElementById('post3').innerHTML= "Stop";
  }
}
