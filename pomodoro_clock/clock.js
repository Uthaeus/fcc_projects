let breakMin = document.getElementById('break-length');
let sessionMin = document.getElementById('session-length');
let label = document.getElementById('timer-label');
let paused = true;
let mainTimer = true;
let timer = document.getElementById('time-left');

function setLabel(type) {
  switch (type) {
    case 'pause':
      label.innerHTML = 'Paused...';
      break;
    case 'session':
      label.innerHTML = 'Session Timer';
      break;
    case 'break':
      label.innerHTML = 'Break Timer';
      break;
    case 'session-end':
      label.innerHTML = 'Session has ended...Beginning Break Timer';
      break;
    case 'break-end':
      label.innerHTML = 'Break has ended...Beginning new Break';
      break;
    default:
      label.innerHTML = 'Adjust Timer and Begin';
      break;
  }
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

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
  paused = true;

  if (sessionMin.innerHTML > 0) {
    sessionMin.innerHTML--;
    clockAdjust(sessionMin.innerHTML);
    mainTimer = true;
  }
}

function sessionIncrement() {
  paused = true;

  if (sessionMin.innerHTML < 60) {
    sessionMin.innerHTML++;
    clockAdjust(sessionMin.innerHTML);
    mainTimer = true;
  }
}

function startStop() {
  if (paused) {
    paused = false;
    
    if (mainTimer) {
      setLabel('session');
    } else {
      setLabel('break');
    }
  } else {
    paused = true;
    
    label.innerHTML = 'Paused';
  }
  countdown();
}

function prepClock() {
  if (!mainTimer) {
    clockAdjust(breakMin.innerHTML);
    setLabel('break');
  } else {
    clockAdjust(sessionMin.innerHTML);
    setLabel('session');
  }
}

function intermission() {
  document.getElementById('beep').play();
  //setInterval()
  if (mainTimer) {
    setLabel('session-end');
    mainTimer = false;

  } else {
    setLabel('break-end');
    mainTimer = true;

  }
  sleep(2000).then(() => {
    prepClock();
  });
  
}

function countdown() {
  let out = true, delay;
  let clock = timer.innerHTML.split(':');
  let mins = +clock[0];
  let secs = +clock[1];

  if (paused) {
    clearInterval(delay);
  } else {
    delay = setInterval(countdown, 1000);
  }

  if (mins > 0 || secs > 0) {
    secs--;
  }
  if (secs <= 0) {
    if (mins <= 0 && secs <= 0) {
      intermission();
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
  breakMin.textContent = 5;
  sessionMin.innerHTML = 25;
  timer.innerHTML = '25:00';
  paused = false;
  startStop();
  setLabel();
}