let breakTime = document.getElementById('break-length');
let sessionTime = document.getElementById('session-length');
let label = document.getElementById('timer-label');
let timer = document.getElementById('time-left');


class Clock {
    constructor() {
        this.delay;
        this.paused = true;
        this.session = true;
        this.bTime = 5;
        this.sTime = 25;
        this.labe = 'Adjust time and begin';
    }

    set = () => {
        breakTime.innerHTML = this.bTime;
        sessionTime.innerHTML = this.sTime;
        label.innerHTML = this.labe;
        formatTimer(this.sTime);
    }

    formatTimer = (mins, secs) => {
        if (mins < 10) {
            mins = '0' + mins.toString();
        }
        if (secs < 10) {
            secs = '0' + secs.toString();
        }
        timer.innerHTML = mins + ':' + secs;
    }
}