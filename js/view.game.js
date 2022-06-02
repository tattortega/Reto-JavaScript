export const gameView = () => {

    const container = document.querySelector("#container");

    const welcome = document.createElement("div");
    welcome.classList.add("welcome-container");

    const titleGame = document.createElement("h1");
    titleGame.textContent = "¿Quien quiere ser Millonario?";

    const messageWelcome = document.createElement("p");
    messageWelcome.innerHTML = "Bienvenido al concurso";

    const username = document.createElement("input");
    username.type = "text";
    username.id = "playerName";
    username.setAttribute('required', '');
    username.placeholder = "Ingresa su nombre";

    const start = document.createElement("button");
    start.id = "buttonStart";
    start.textContent = "Iniciar juego";

    const gameHistory = document.createElement("button");
    gameHistory.id = "gameHistory";
    gameHistory.textContent = "Historial";

    welcome.append(messageWelcome, username, start, gameHistory);
    container.append(titleGame, welcome);

    const containerGame = document.querySelector("body");

    const sectionGame = document.createElement("div");
    sectionGame.id = "section-game";
    containerGame.append(sectionGame);
};