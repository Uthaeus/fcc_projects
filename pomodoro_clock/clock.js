let breakMin = document.getElementById('break-length');
let sessionMin = document.getElementById('session-length');
let timerMin = document.getElementById('minutes');
let timerSec = document.getElementById('seconds');
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
    timerSec.innerHTML = 00;
  }
}

function sessionIncrement() {
  if (sessionMin.innerHTML < 60) {
    sessionMin.innerHTML++;
    timerMin.innerHTML = sessionMin.innerHTML;
    timerSec.innerHTML = 00;
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

// function start() {
//   delay = setInterval(timer, 1000);
// }

// function stop() {
//   clearInterval(delay);
// }

function timer() {
  if (timerMin.innerHTML > 0 || timerSec.innerHTML > 0) {
    timerSec.innerHTML--;
    if (timerSec.innerHTML <= 0) {
      timerMin.innerHTML--;
      timerSec.innerHTML = 59;
      if (timerMin.innerHTML == 0 && timerSec.innerHTML == 0) {
        countOver();
      }
    }
  }
}

function resetClock() {
  breakMin.textContent = 5;
  sessionMin.innerHTML = 25;
  timerMin.innerHTML = 25;
  timerSec.innerHTML = 00;
  paused = false;
  startStop();
}