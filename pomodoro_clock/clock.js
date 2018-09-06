let breakMin = document.getElementById('break-length');
let sessionMin = document.getElementById('session-length');
let timerMin = document.getElementById('minutes');
let timerSec = document.getElementById('seconds');
let runClock = false;


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
  runClock = !runClock;

  if (runClock) {
    if (timerMin.innerHTML > 0 && timerSec.innerHTML > 0) {
      let mins = timerMin.innerHTML, secs = timerSec.innerHTML;
      setInterval(function() {
        timerMin.innerHTML = mins;
        timerSecs.innerHTML = secs;
        secs--;
        if (secs == 00) {
          mins--;
          secs = 60;
          if (mins == 0 && secs == 0) {
            countOver();
          }
        }
      }, 1000);
    }
  }
}

function resetClock() {
  breakMin.textContent = 5;
  sessionMin.innerHTML = 25;
  timerMin.innerHTML = 25;
  timerSec.innerHTML = 00;
  runClock = false;
}