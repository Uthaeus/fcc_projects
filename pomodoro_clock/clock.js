let breakMin = document.getElementById('break-length');
let sessionMin = document.getElementById('session-length');
let timerMin = document.getElementById('minutes');
let timerSec = document.getElementById('seconds');
let label = document.getElementById('timer-label');
let delay;
let paused = true;


function breakDecrement() {
  if (breakMin.innerHTML > 0) {
    breakMin.innerHTML--;
  }
}

function breakIncrement() {
  if (breakMin.innerHTML < 60) {
    breakMin.innerHTML++;
  }
}

function sessionDecrement() {
  if (sessionMin.innerHTML > 0) {
    sessionMin.innerHTML--;
    timerMin.innerHTML = sessionMin.innerHTML;
    timerSec.innerHTML = 0;
  }
}

function sessionIncrement() {
  if (sessionMin.innerHTML < 60) {
    sessionMin.innerHTML++;
    timerMin.innerHTML = sessionMin.innerHTML;
    timerSec.innerHTML = 0;
  }
}

function startStop() {
  if (paused) {
    paused = false;
    delay = setInterval(timer, 1000);
  } else {
    paused = true;
    clearInterval(delay);
  }
}

function timer() {
  if (timerMin.innerHTML > 0 || timerSec.innerHTML > 0) {
    timerSec.innerHTML--;
    if (timerSec.innerHTML <= 0) {
      if (timerMin.innerHTML <= 0 && timerSec.innerHTML <= 0) {
        countOver();
      }
      timerMin.innerHTML--;
      timerSec.innerHTML = 59;
    }
  }
}

function countOver() {
  startStop();
  label.innerHTML = "Time is up";
  resetClock();
}

function resetClock() {
  label.innerHTML = 'Adjust to a desired time and begin your session.'
  breakMin.textContent = 5;
  sessionMin.innerHTML = 25;
  timerMin.innerHTML = 25;
  timerSec.innerHTML = 0;
  paused = false;
  startStop();
}