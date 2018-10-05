let breakTime = document.getElementById('break-length');
let sessionTime = document.getElementById('session-length');
let label = document.getElementById('timer-label');
let timer = document.getElementById('time-left');
let delay, paused = true, session = true;


const breakIncrement = () => {
    if (breakTime.innerHTML < 60 && breakTime.innerHTML >= 0) {
        breakTime.innerHTML++;
    }
    if (!session) {
        pause();
        clockAdjust(breakTime.innerHTML);
    }
}

const breakDecrement = () => {
    if (breakTime.innerHTML <= 60 && breakTime.innerHTML > 1) {
        breakTime.innerHTML--;
    }
    if (!session) {
        pause();
        clockAdjust(breakTime.innerHTML);
    }
}

const sessionIncrement = () => {
    if (sessionTime.innerHTML < 60 && sessionTime.innerHTML >= 0) {
        sessionTime.innerHTML++;
        clockAdjust(sessionTime.innerHTML);
    }
    pause();
}

const sessionDecrement = () => {
    if (sessionTime.innerHTML <= 60 && sessionTime.innerHTML > 1) {
        sessionTime.innerHTML--;
        clockAdjust(sessionTime.innerHTML);
    }
    pause();
}

const startStop = () => {
    if (paused) {
        delay = setInterval(clock, 1000);
        if (session) {
            setLabel('session');
        } else {
            setLabel('break');
        }
        paused = false;
    } else {
        clearInterval(delay);
        setLabel('pause');
        paused = true;
    }
}

const clockAdjust = min => {
    timer.innerHTML = `${min}:00`;
}

const resetClock = () => {
    document.getElementById('beep').pause();
    pause();
    breakTime.innerHTML = 5;
    sessionTime.innerHTML = 25;
    timer.innerHTML = '25:00';
    setLabel();
}

const clock = () => {
    let timerArr = timer.innerHTML.split(':');
    let mins = +timerArr[0];
    let secs = +timerArr[1];
    let out = true;

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

const intermission = () => {
    pause();
    formatOut(0, 0);
    document.getElementById('beep').play();
    if (session) {
        setLabel('session-end');
        clockAdjust(breakTime.innerHTML);
        session = false;
    } else {
        setLabel('break-end');
        clockAdjust(sessionTime.innerHTML);
        session = true;
    }
    sleep(2000).then(() => {
        startStop();
    });
}

const setLabel = type => {
    switch (type) {
        case 'pause':
            label.innerHTML = 'Paused...';
            break;
        case 'session-end':
            label.innerHTML = 'End of Session\nBreak Beginning';
            break;
        case 'break-end':
            label.innerHTML = 'End of Break\nSession Beginning';
            break;
        case 'session':
            label.innerHTML = 'Session Timer';
            break;
        case 'break':
            label.innerHTML = 'Break Timer';
            break;
        default:
            label.innerHTML = 'Adjust time and begin';
            break;
    }
}

const pause = () => {
    paused = true;
    clearInterval(delay);
}

const formatOut = (mins, secs) => {
    if (mins < 10) {
        mins = '0' + mins.toString();
    }
    if (secs < 10) {
        secs = '0' + secs.toString();
    }
    timer.innerHTML = mins + ':' + secs;
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
