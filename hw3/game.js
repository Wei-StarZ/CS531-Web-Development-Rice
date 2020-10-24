var g = document.getElementById("canvas");
g.addEventListener("click", handleCanvasClick);
var startBtn = document.getElementById("start");
startBtn.addEventListener("click", handleButtonClick);
var scorePara = document.getElementById("Score");
var arrowPara = document.getElementById("Arrow");
var best = document.getElementById("Best Score");
var longest = document.getElementById("Longest Combo");
var combo = document.getElementById("Current Combo")
var currentCombo;
var end = document.getElementById("end");
var context = g.getContext("2d");
var r;
var color;
var currentX;
var currentY;
var score;
var arrow;
var speed;
var setId;
var direction;
if (window.localStorage.getItem('longest') == null) {
  window.localStorage.setItem('longest', 0);
}
longest.innerHTML = longest.innerHTML.substring(0, 15) + localStorage.getItem('longest');
if (window.localStorage.getItem('Best Score') == null) {
  window.localStorage.setItem('Best Score', 0);
}
best.innerHTML = best.innerHTML.substring(0, 12) + localStorage.getItem('Best Score');
function setup() {
  if (Math.random() > 0.5) {
    direction = 1;
  }
  else {
    direction = -1;
  }
  currentCombo = 0;
  r = 40;
  currentX = -40;
  currentY = 250;
  color = "red";
  score = 0;
  arrow = 20;
  speed = 3;
  end.hidden = true;
  start();
}

function start() {
  setId = setInterval(updateArea, 5);
}

function handleCanvasClick(e) {
  if (startBtn.innerHTML == "End") {
    var bound = g.getBoundingClientRect();
    var x = e.clientX - bound.left;
    var y = e.clientY - bound.top;
    if (x >= currentX - 40 && x <= currentX  + 40 && y >= currentY - 40 && y <= currentY + 40) {
      score += 100 + currentCombo * 100;
      arrow -= 1;
      if (color == "yellow") {
        arrow += 5;
      }
      if (score > localStorage.getItem('Best Score')) {
        localStorage.setItem('Best Score', score);
        best.innerHTML = best.innerHTML.substring(0, 12) + localStorage.getItem('Best Score');
      }
      scorePara.innerHTML = scorePara.innerHTML.substring(0, 7) + score;
      arrowPara.innerHTML = arrowPara.innerHTML.substring(0, 7) + arrow;
      if (score % 300 == 0) {
        speed += 1;
      }
      if (color == "blue" && speed > 2) {
        speed -= 0.7;
      }
      currentCombo += 1;
      if (currentCombo > localStorage.getItem('longest')) {
        localStorage.setItem('longest', currentCombo);
        longest.innerHTML = longest.innerHTML.substring(0, 15) + localStorage.getItem('longest');
      }
      reset();
    }
    else {
      currentCombo = 0;
      arrow -= 1;
      arrowPara.innerHTML = arrowPara.innerHTML.substring(0, 7) + arrow;
    }
    if (arrow == 0) {
      clearInterval(setId);
      context.clearRect(0, 0, g.width, g.height);
      end.hidden = false;
      arrow = 20;
      score = 0;
      currentX = -40;
      currentY = 250;
      arrowPara.innerHTML = arrowPara.innerHTML.substring(0, 7) + arrow;
      scorePara.innerHTML = scorePara.innerHTML.substring(0, 7) + score;
      startBtn.innerHTML = "Start";
    }
  }
}

function update(){
    context.fillStyle = color;
    context.beginPath();
    context.arc(currentX, currentY, 40, 0, 2 * Math.PI, false);
    context.closePath();
    context.fill();
  }

function position(){
  currentX += Math.floor(Math.random() * speed);
  if (currentY > 460 || currentY < 40) {
    direction = -direction;
  }
  currentY -= direction * Math.floor(Math.random() * speed);
}

function updateArea() {
  combo.innerHTML = combo.innerHTML.substring(0, 15) + currentCombo;
  if (currentX > g.width) {
    if (score > 0) {
      score -= 100;
      scorePara.innerHTML = scorePara.innerHTML.substring(0, 7) + score;
    }
    reset();
  }
  context.clearRect(0, 0, g.width, g.height);
  position();
  update();
}

function reset() {
  currentX = -40;
  currentY = Math.floor(Math.random() * 300) + 100;
  direction = -direction;
  var rand = Math.random();
  if (rand < 0.1) {
    color = "blue";
  }
  else if (rand > 0.9) {
    color = "yellow";
  }
  else{
    color = "red";
  }
}

function handleButtonClick() {
  if (startBtn.innerHTML == "Start") {
    setup();
    startBtn.innerHTML = "End";
  }
  else {
    currentX = -40;
    currentY = 250;
    score = 0;
    arrow = 20;
    speed = 3;
    currentCombo = 0;
    combo.innerHTML = combo.innerHTML.substring(0, 15) + currentCombo;
    arrowPara.innerHTML = arrowPara.innerHTML.substring(0, 7) + arrow;
    scorePara.innerHTML = scorePara.innerHTML.substring(0, 7) + score;
    context.clearRect(0, 0, g.width, g.height);
    clearInterval(setId);
    startBtn.innerHTML = "Start";
  }
}
