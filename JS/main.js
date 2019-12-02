const DOMElement = {
        score: document.getElementById("score"),
        points: document.getElementById("points"),
        level: document.getElementById("level"),
        missclicks: document.getElementById("missClicks"),
        timer: document.getElementById("timer"),
        click: document.getElementsByClassName("click")[0],
        winners: document.getElementById("winners")
    },
    gameElement = {
        score: 0,
        points: 10,
        level: 1,
        missclicks: 0,
        timer: 60
    };
var clicks = 0;
var escapeTime = 300;
var gameBoard = document.getElementsByClassName("gameBoard")[0];
var r = 2;
var flag = false;
var toAppend = "";
var date = "";
var info = "";
// var newWinner = "";




var winnersJSON = localStorage.getItem("theWinners");
var winners = [];
if (winnersJSON != null) {
    winners = JSON.parse(winnersJSON)
    craeteHTML();
}

function craeteHTML() {
    winnersJSON = JSON.stringify(winners);
    localStorage.setItem("theWinners", winnersJSON);
    toAppend = "";
    winners.forEach(function (users, i) {
        var wwinner = `<div class="winner"> <div class="winnerScore">  ${users.score}</div> 
        <div class="winnerName"> ${users.name} </div> </div>
        <div class="winnerDete">${users.date} </div> </br>`;
        toAppend += wwinner;
    });
    DOMElement.winners.innerHTML = toAppend;
}
// var winner = document.getElementsByClassName("winner");
// var winnerDete = document.getElementsByClassName("winnerDete");
// winner.addEventListener("mouseover", over);
// function over() {
//     winnerDete.style.display = "block";
// }


function newPlay() {
    if (flag) {
        clearInterval(repeat);
        reset();
        flag = false;
        start()
    }
}

function start() {
    if (flag) {

    } else {
        flag = true
        timer();
        DOMElement.click.addEventListener("click", goodClikcs);
        DOMElement.click.addEventListener("mouseover", escape);
        gameBoard.addEventListener("click", missClicks);
        DOMElement.click.style.animation = ("myAnimation " + r + "s infinite linear");
    }
}

function timer() {
    repeat = setInterval(function () {
        if (gameElement.timer == 0) {
            gameOver();
        } else {
            gameElement.timer--;
            DOMElement.timer.innerHTML = gameElement.timer;
        }
    }, 1000)
}

function gameOver() {
    flag = false;
    clearInterval(repeat);
    info = ("הציון שלך הוא " + gameElement.score + " \n לחיצות שווא " + gameElement.missclicks);
    DOMElement.click.removeEventListener("click", goodClikcs);
    DOMElement.click.removeEventListener("mouseover", escape);
    gameBoard.removeEventListener("click", missClicks);
    DOMElement.click.style.animation = ("myAnimation 0s infinite linear");
    DOMElement.click.style.left = "0px";
    DOMElement.click.style.top = "0px";
    // reset();
    inspect();
}

function reset() {
    gameElement.score = 0;
    gameElement.points = 10;
    gameElement.level = 1;
    gameElement.missclicks = 0;
    gameElement.timer = 60;
    DOMElement.score.innerHTML = gameElement.score;
    DOMElement.points.innerHTML = gameElement.points;
    DOMElement.level.innerHTML = gameElement.level;
    DOMElement.missclicks.innerHTML = gameElement.missclicks;
    DOMElement.timer.innerHTML = gameElement.timer;
}

function escape() {
    setTimeout(() => {
        DOMElement.click.style.left = (Math.random() * 770) + "px";
        DOMElement.click.style.top = (Math.random() * 522.5) + "px";
    }, escapeTime)
}

function goodClikcs(e) {
    e.stopPropagation();
    clicks++;
    if (clicks == 10) {
        level();
    }
    gameElement.score += 10 * gameElement.level;
    DOMElement.score.innerHTML = gameElement.score;
}

function missClicks() {
    gameBoard.style.backgroundColor = "red";
    setTimeout(() => {
        gameBoard.style.backgroundColor = "black";
    }, 10);
    gameElement.missclicks++;
    gameElement.score -= gameElement.level;
    DOMElement.score.innerHTML = gameElement.score;
    DOMElement.missclicks.innerHTML = gameElement.missclicks;
}

function level() {
    clicks = 0;
    gameElement.level += 1;
    gameElement.points += 10;
    gameElement.timer += 10;
    DOMElement.level.innerHTML = gameElement.level;
    DOMElement.points.innerHTML = gameElement.points;
    r -= 0.25;
    escapeTime -= 50;
}

function inspect() {
    if (winners.length < 5 || gameElement.score > winners[4].score) {
        var name = prompt(info + '\n הכנס כאן את שמך');
        newDate();
        newWinner = new winner(name, gameElement.score, date);
        insertion();
    } else {
        alert(info);
    }
    reset()
}


function newDate() {
    theDate = new Date;
    date = theDate.getDate() + "/" + theDate.getMonth() + "/" + theDate.getFullYear();
}

function winner(_name, _score, _date) {
    this.name = _name;
    this.score = _score;
    this.date = _date;
}

function insertion() {
    for (i = 3; i >= 0; i--) {
        if (gameElement.score < winners[i].score) {
            winners.splice(i + 1, 0, newWinner);
            break;
        }
        if (gameElement.score > winners[0].score) {
            winners.splice(0, 0, newWinner);
        }
    }
    winners.pop()
    craeteHTML();
}

// var winners = [{
//         name: "unknown",
//         score: 20,
//         date: "1 / 1 / 2000"
//     },
//     {
//         name: "unknown",
//         score: 15,
//         date: "1 / 1 / 2000"
//     },
//     {
//         name: "unknown",
//         score: 10,
//         date: "1 / 1 / 2000"
//     },
//     {
//         name: "unknown",
//         score: 5,
//         date: "1 / 1 / 2000"
//     },
//     {
//         name: "unknown",
//         score: 1,
//         date: "1 / 1 / 2000"
//     }
// ];

// var winnersJSON = localStorage.getItem("theWinners");
// var winners = [];
// if (winnersJSON != null) {
//    winners = JSON.parse(winnersJSON)
// } להוציא מהאיחסון

// winnersJSON = JSON.stringify(winners);
// localStorage.setItem("theWinners", winnersJSON);
// להוסיף לאחסון