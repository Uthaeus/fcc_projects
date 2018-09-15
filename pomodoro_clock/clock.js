let breakMin = document.getElementById('break-length');
let sessionMin = document.getElementById('session-length');
let label = document.getElementById('timer-label');
let delay;
let paused = true;
let mainTimer = true;
let timer = document.getElementById('time-left');

function clockAdjust(min) {
  timer.innerHTML = `${min}:00`;
}

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
    clockAdjust(sessionMin.innerHTML);
  }
}

function sessionIncrement() {
  if (sessionMin.innerHTML < 60) {
    sessionMin.innerHTML++;
    clockAdjust(sessionMin.innerHTML);
  }
}

function startStop() {
  if (paused) {
    paused = false;
    delay = setInterval(countdown, 1000);
    if (mainTimer) {
      label.innerHTML = 'Session';
    } else {
      label.innerHTML = 'Break';
    }
  } else {
    paused = true;
    clearInterval(delay);
    label.innerHTML = 'Paused';
  }

}

function countdown() {
  let out = true;
  let clock = timer.innerHTML.split(':');
  let mins = +clock[0];
  let secs = +clock[1];

  if (mins > 0 || secs > 0) {
    secs--;
  }
  if (secs <= 0) {
    if (mins <= 0 && secs <= 0) {
      document.getElementById('beep').play();
      if (mainTimer) {
        clockAdjust(breakMin.innerHTML);
        mainTimer = false;
      } else {
        clockAdjust(sessionMin.innerHTML);
        mainTimer = true;
      }
      out = false;
    } else {
      mins--;
      secs = 59;
    }
  }
  
  if (out) {
    formatOut(mins, secs);
  }
  
}

function formatOut(mins, secs) {
  if (mins < 10) {
    mins = '0' + mins.toString();
  }

  if (secs < 10) {
    secs = '0' + secs.toString();
  }
  timer.innerHTML = `${mins}:${secs}`;
}

function resetClock() {
  label.innerHTML = 'Adjust to a desired time and begin your session.'
  breakMin.textContent = 5;
  sessionMin.innerHTML = 25;
  timer.innerHTML = '25:00';
  paused = false;
  startStop();
}