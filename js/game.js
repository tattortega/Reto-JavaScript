import { gameView } from './view.game.js';
import { math, spanish, culture, biology, tech } from './question.js';


gameView();

const mainGame = document.querySelector('#section-game');
const showHistory = document.querySelector('#gameHistory');
let buttonAnswer = '';
let level = 0;
let idPlayer = 0;
let points = 0;
let history = [];
let gameActive = false;

const startGame = () => {
    const playerName = document.querySelector('#playerName').value;
    if (playerName == "") {
        alert("El nombre es requerido");
    } else {
        setPlayer(playerName);
        const children = document.querySelectorAll('#container > *');
        for (let c of children) {
            c.remove();
        }
        loopQuestions();
    }
};

const buttonStart = document.querySelector('#buttonStart');
buttonStart.addEventListener('click', startGame);

const setPlayer = (playerName) => {
    history.push({ player: playerName, points: points });
    const p = document.createElement('p');
    p.innerHTML = `Bienvenido ${history[idPlayer].player}`;
    mainGame.appendChild(p);
};

const loopQuestions = () => {
    if (level < 5) {
        const categories = [math, biology, spanish, tech, culture];
        let category = categories[level];
        let randomQuestion = Math.floor(Math.random() * 5 + 1);
        showQuestion(category, randomQuestion);
    } else {
        const gameWinner = document.createElement('p');
        gameWinner.id = 'gameWinner';
        gameWinner.innerHTML = 'Ganaste el juego';
        mainGame.appendChild(gameWinner);
        surrender();
        idPlayer++;
    }
};

const showQuestion = (category, randomQuestion) => {
    const message = document.createElement('p');
    message.id = 'message';
    message.innerHTML = 'Eliga la opción correcta';
    mainGame.appendChild(message);
    const question = document.createElement('p');
    question.id = 'question';
    question.innerHTML = 'Pregunta: ' + category[randomQuestion].question;
    mainGame.appendChild(question);
    const answers = category[randomQuestion].options;

    let i = 1;
    for (let a of answers) {
        const option = document.createElement('button');
        option.id = 'answer';
        option.onclick = () => {
            buttonAnswer = a;
            checkUserAnswer(category, randomQuestion, buttonAnswer);
        };
        option.innerHTML = a;
        mainGame.appendChild(option);
        i++;
    }

    const surrrender = document.createElement('button');
    surrrender.id = 'surrender';
    surrrender.innerHTML = 'Rendirse';
    surrrender.onclick = () => {
        removeChildren();
        showPoints();
    }
    mainGame.appendChild(surrrender);

};

const removeChildren = () => {
    const children = document.querySelectorAll('#section-game > *');
    for (let c of children) {
        c.remove();
    }
};

function checkUserAnswer(category, randomQuestion, buttonAnswer) {
    const answerCorrect = category[randomQuestion].correct;

    if (buttonAnswer == answerCorrect) {
        history[idPlayer].points++;
        const historyLocalStorage = new Array(history);
        const historLocalStorage = localStorage.setItem("history", new Array(JSON.stringify(historyLocalStorage)));
        console.log(historyLocalStorage)
        level++;
        gameActive = true;
        removeChildren();
        showPoints();
        loopQuestions();
    } else {
        alert('Respuesta incorrecta');
        removeChildren();
        gameActive = false;
        const endGame = document.createElement('p');
        endGame.id = 'endGame';
        endGame.innerHTML = 'Fin del juego';
        mainGame.appendChild(endGame);
        showPoints();
        idPlayer++;
        level = 0;
    }
}

function showPoints() {
    const pointsPlayer = document.createElement('p');
    pointsPlayer.id = 'points';
    pointsPlayer.innerHTML = 'Puntos: ' + history[idPlayer].points;
    mainGame.appendChild(pointsPlayer);
    if (gameActive) {
        surrender();
    }

}

function surrender() {
    const backHome = document.createElement('button');
    backHome.id = 'backHome';
    backHome.innerHTML = "Regresar al inicio";
    backHome.onclick = () => {
        removeChildren();
        window.location.reload();
    }
    mainGame.appendChild(backHome);
}


showHistory.addEventListener('click', () => {
    const children = document.querySelectorAll('#container > *');
    for (let c of children) {
        c.remove();
    }
    const historyPlayers = document.createElement('p');
    historyPlayers.innerHTML = 'Historial de jugadores';
    mainGame.appendChild(historyPlayers);
    let orderPoints = history.sort((a, b) => {
        return b.points - a.points;
    });
    for (let h of orderPoints) {
        const orderedPoints = document.createElement('p');
        orderedPoints.innerHTML = `${h.player} - ${h.orderedPoints}`;
        mainGame.appendChild(p);
    }
});