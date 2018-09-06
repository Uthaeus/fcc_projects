let breakMin = document.getElementById('break-length');
let sessionMin = document.getElementById('session-length');
let timerMin = document.getElementById('minutes');
let timerSec = document.getElementById('seconds');


function breakDecrement() {
  console.log(breakMin.value);
  let newTime = breakMin.data - 1;
  breakMin.innerHTML = newTime;
}

function breakIncrement() {

}

function sessionDecrement() {

}

function sessionIncrement() {

}

function setBreak() {

}

function setSession() {

}

function resetClock() {
  breakMin.textContent = 5;
  sessionMin.innerHTML = 25;
  timerMin.innerHTML = 25;
  timerSec.innerHTML = 00;
}