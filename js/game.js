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
let namePlayer = '';
let gameActive = false;

const startGame = () => {
    const playerName = document.querySelector('#playerName').value;
    if (playerName == "") {
        alert("El nombre es requerido");
    } else {
        namePlayer = playerName;
        history.push({namePlayer: namePlayer, points: points});
        const children = document.querySelectorAll('#container > *');
        for (let c of children) {
            c.remove();
        }
        const p = document.createElement('p');
        p.innerHTML = `Bienvenido ${namePlayer}`;
        mainGame.appendChild(p);
        loopQuestions();
    }
};

const buttonStart = document.querySelector('#buttonStart');
buttonStart.addEventListener('click', startGame);

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
        endGame();
        idPlayer++;
        addPlayers();
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
        i++;
        option.onclick = () => {
            buttonAnswer = a;
            checkUserAnswer(category, randomQuestion, buttonAnswer);
        };
        option.innerHTML = a;
        mainGame.appendChild(option);
    }

    const surrrender = document.createElement('button');
    surrrender.id = 'surrender';
    surrrender.innerHTML = 'Rendirse';
    surrrender.onclick = () => {
        removeChildren();
        showPoints();
        addPlayers();
        endGame();
    }
    mainGame.appendChild(surrrender);
};

const removeChildren = () => {
    const children = document.querySelectorAll('#section-game > *');
    for (let c of children) {
        c.remove();
    }
};

function addPlayers() {
    let recoveredData = localStorage.getItem('storage');
    let data = JSON.parse(recoveredData);
    let newPlayers = history;
    if (recoveredData == null) {
        localStorage.setItem('storage', JSON.stringify(newPlayers));
    } else {
        let newPlayer = { namePlayer: namePlayer, points: points };
        data.push(newPlayer);
        localStorage.setItem('storage', JSON.stringify(data));
    }
}

function checkUserAnswer(category, randomQuestion, answerPlayer) {
    const answerCorrect = category[randomQuestion].correct;
    if (answerPlayer == answerCorrect) {
        points += 10;
        level++;
        gameActive = true;
        removeChildren();
        showPoints();
        loopQuestions();
    } else {
        alert('Respuesta incorrecta');
        removeChildren();
        gameActive = false;
        const end_game = document.createElement('p');
        end_game.id = 'endGame';
        end_game.innerHTML = 'Fin del juego';
        mainGame.appendChild(end_game);
        addPlayers();
        showPoints();
        endGame();
        idPlayer++;
        level = 0;
    }
}

function showPoints() {
    const pointsPlayer = document.createElement('p');
    pointsPlayer.id = 'points';
    pointsPlayer.innerHTML = 'Puntos: ' + points;
    mainGame.appendChild(pointsPlayer);
}

function endGame() {
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
    let listPlayerStorage = JSON.parse(localStorage.getItem('storage'));
    if (listPlayerStorage == null) {
        endGame();
    } else {
        listPlayerStorage.forEach(player => {
            const listPoints = document.createElement('p');
            listPoints.id = 'listPoints';
            listPoints.innerHTML = `${player.namePlayer} - ${player.points} puntos`;
            mainGame.append(listPoints);
        });
        endGame();
    }
});

