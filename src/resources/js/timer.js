let counter;
let isCounting = false;
let turn = "white";
let timer;
let times;
let bonusTime;

function getTime(time) {
    let minutes = parseInt(time / 60, 10);
    let seconds = parseInt(time % 60, 10);
    if (minutes < 10){
        minutes = "0" + minutes;
    }
    if (seconds < 10){
        seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
}

function startTimer() {
    let minutes = parseInt(document.getElementById("minute-input").value);
    let seconds = minutes*60 + parseInt(document.getElementById("second-input").value);
    bonusTime = parseInt(document.getElementById("bonus-input").value);
    if (seconds < 0){
        alert("Gametime has to be longer than 1 minute")
    }else {
        times = {
            "white": seconds,
            "black": seconds
        };
        document.getElementById("black-time").innerText = getTime(times["black"]);
        document.getElementById("white-time").innerText = getTime(times["white"]);
        if (isCounting === false) {
            isCounting = true;
            timer = setInterval(function () {
                times[turn]--;
                document.getElementById(turn + "-time").innerText = getTime(times[turn]);
                if (times[turn] === 0) {
                    alert("TIME." + switchColor(turn).slice(1) + switchColor(turn).slice(1) + " wins. Congratulations!");
                    document.getElementById("prompter").innerHTML = turn.charAt(0).toUpperCase() + turn.slice(1) + " ran out of time! " + switchColor(turn) + " won!";
                    clearInterval(timer);
                    timer = false;
                }
            }, 1000);
        }
    }
}

function switchTimers(){
    if (turn === "white"){
        addBonusTime();
        turn = "black";

    } else{
        addBonusTime();
        turn = "white";
    }
}

function addBonusTime() {
    times[turn] += bonusTime;
    document.getElementById(turn +"-time").innerText = getTime(times[turn]);
    document.getElementById("prompter").innerHTML = switchColor(turn).charAt(0).toUpperCase() + switchColor(turn).slice(1) + "'s turn";
}

function switchColor(color) {
    if (color === "white") return "black";
    else return "white";
}