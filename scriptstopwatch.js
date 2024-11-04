// Stopwatch Functionality
let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');

if (display) {
    document.getElementById('startBtn').onclick = start;
    document.getElementById('pauseBtn').onclick = pause;
    document.getElementById('resetBtn').onclick = reset;
    document.getElementById('lapBtn').onclick = recordLap;

    function start() {
        if (!running) {
            startTime = new Date().getTime() - (difference || 0);
            tInterval = setInterval(updateTime, 100);
            running = true;
        }
    }

    function updateTime() {
        updatedTime = new Date().getTime();
        difference = updatedTime - startTime;

        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        display.innerHTML = (hours < 10 ? "0" : "") + hours + ":" +
                            (minutes < 10 ? "0" : "") + minutes + ":" +
                            (seconds < 10 ? "0" : "") + seconds;
    }

    function pause() {
        clearInterval(tInterval);
        running = false;
    }

    function reset() {
        clearInterval(tInterval);
        running = false;
        difference = 0;
        display.innerHTML = "00:00:00";
        lapsContainer.innerHTML = '';
        lapCounter = 1;
    }

    function recordLap() {
        if (running) {
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            const lapTime = (hours < 10 ? "0" : "") + hours + ":" +
                            (minutes < 10 ? "0" : "") + minutes + ":" +
                            (seconds < 10 ? "0" : "") + seconds;

                            lapsContainer.innerHTML += `<div>Lap ${lapCounter}: ${lapTime}</div>`;
            lapCounter++;
        }
    }
}
