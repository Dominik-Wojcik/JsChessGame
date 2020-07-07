function startTimer(duration, timer) {
    setInterval(function () {
        let minutes = parseInt(duration / 60, 10);
        let seconds = parseInt(duration % 60, 10);
        if (minutes < 10){
            minutes = "0" + minutes;
        }
        if (seconds < 10){
            seconds = "0" + seconds;
        }
        timer.textContent = minutes + ":" + seconds;
        duration--;
        if (duration < 0) {
            clearInterval(duration);
            document.getElementById("timer").innerHTML = "Time is up!";
        }

    },1000);
}

window.onload = function () {
    const timer = document.querySelector('#timer');
    startTimer(10, timer);
};