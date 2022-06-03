import { gameView } from './view.game.js';
import { math, spanish, culture, biology, tech } from './question.js';

/**
 * @author Ricardo Ortega <tattortega.28@gmail.com>
 * @version 1.0.0 2022/06/02
 * @since 1.0.0
 */

gameView();

const mainGame = document.querySelector('#section-game');
const showHistory = document.querySelector('#gameHistory');
let buttonAnswer = '';
let level = 0;
let points = 0;
let history = [];
let namePlayer = '';

/**
 * Inicia el juego
 */
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

/**
 * Escucha el evento startGame
 */
const buttonStart = document.querySelector('#buttonStart');
buttonStart.addEventListener('click', startGame);

/**
 * Elige la categoria y pregunta aleatoriamente  
 */
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
        addPlayers();
    }
};

/**
 * Muestra la pregunta elegida con sus opciones de respuesta
 * @param {*} category 
 * @param {*} randomQuestion 
 */
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

/**
 * Remueve todos los hijos del section-game
 */
const removeChildren = () => {
    const children = document.querySelectorAll('#section-game > *');
    for (let c of children) {
        c.remove();
    }
};

/**
 * Función para agregar jugadores en el localStorage
 */
function addPlayers() {
    let recoveredData = localStorage.getItem('storage');
    let data = JSON.parse(recoveredData);
    let newPlayers = history;
    if (recoveredData == null) {
        localStorage.setItem('storage', JSON.stringify(newPlayers));
    } else {
        let newPlayer = { namePlayer: namePlayer, points: history[0].points };
        data.push(newPlayer);
        localStorage.setItem('storage', JSON.stringify(data));
    }
}

/**
 * Función que comprueba la opcion elegida por el jugador y la respuesta correcta
 * @param {*} category 
 * @param {*} randomQuestion 
 * @param {*} answerPlayer 
 */
function checkUserAnswer(category, randomQuestion, answerPlayer) {
    const answerCorrect = category[randomQuestion].correct;
    if (answerPlayer == answerCorrect) {
        history[0].points += 10;
        level++;
        removeChildren();
        showPoints();
        loopQuestions();
    } else {
        alert('Respuesta incorrecta');
        removeChildren();
        const end_game = document.createElement('p');
        end_game.id = 'endGame';
        end_game.innerHTML = 'Fin del juego';
        mainGame.appendChild(end_game);
        addPlayers();
        showPoints();
        endGame();
        level = 0;
    }
}

/**
 * Función que muestra los puntos que lleva el jugador
 */
function showPoints() {
    const pointsPlayer = document.createElement('p');
    pointsPlayer.id = 'points';
    pointsPlayer.innerHTML = 'Puntos: ' + history[0].points;
    mainGame.appendChild(pointsPlayer);
}

/**
 * Función cuando el juego termina
 */
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

/**
 * Muestra el historial del juego
 */
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

