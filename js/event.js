const usernameSubmit = document.getElementById("usernameSubmit");
const usernameField = document.getElementById("usernameField");
const usernameForm = document.getElementById("usernameForm");
const playOnlineBtn = document.getElementById("playOnlineBtn");
const playOfflineBtn = document.getElementById("playOfflineBtn");
const playWithAiBtn = document.getElementById("playWithAiBtn");
const interfaceWindow = document.getElementById("interfaceWindow");
const searchingWindow = document.getElementById("searchingWindow");
const options = document.querySelectorAll("#board span");
const winLoseWindow = document.getElementById("winLoseWindow");
const resetBtn = document.getElementById("resetBtn");
const exitBtn = document.getElementById("exitBtn");
const winnerName = document.getElementById("winnerName");
const headerElement = document.querySelector("header");
const PLAYER_X = document.getElementById("playerX");
const PLAYER_O = document.getElementById("playerO");
const NAME_X = document.getElementById("nameX");
const NAME_O = document.getElementById("nameO");
const totalWinX = document.getElementById("totalWinX");
const totalWinO = document.getElementById("totalWinO");
const winStrikeX = document.getElementById("winStrikeX");
const winStrikeO = document.getElementById("winStrikeO");
const closeSearch = document.getElementById("closeSearch");
const exitRunningGame = document.getElementById("exitRunningGame");
const exitTheMatchAlert = document.getElementById("exitTheMatchAlert");
const exitGameNo = document.getElementById("exitGameNo");
const exitGameYes = document.getElementById("exitGameYes");
const messageWindow = document.getElementById("messageWindow");
const messageExitBtn = document.getElementById("messageExitBtn");
const newGameBtn = document.getElementById("newGameBtn");


usernameSubmit.addEventListener("click", (event) => {
   event.preventDefault();
   const nickName = usernameField.value;
   setLocal(USER_NAME_KEY, {
      username: nickName,
      userRef: nickName.toLowerCase() + Date.now()
   });
   window.location.reload();
});

function initialSetupBeforeStart() {
   interfaceWindow.classList.remove("active");
   winLoseWindow.classList.remove("leave");
   headerElement.classList.add("active");
}

playOnlineBtn.addEventListener("click", () => {
   initialSetupBeforeStart();
   startOnlineGame();
});

playOfflineBtn.addEventListener("click", () => {
   initialSetupBeforeStart();
   startOfflineGame();
});

playWithAiBtn.addEventListener("click", () => {

});

closeSearch.addEventListener("click", () => {
   leaveTheGame();
   interfaceWindow.classList.add("active");
   searchingWindow.classList.remove("active");
   headerElement.classList.remove("active");
});

exitRunningGame.addEventListener("click", () => {
   exitTheMatchAlert.classList.add("active");
});

exitGameNo.addEventListener("click", () => {
   exitTheMatchAlert.classList.remove("active");
});

exitGameYes.addEventListener("click", () => {
   exitTheMatchAlert.classList.remove("active");
   leaveTheGame();
   exitSetup();
});

messageExitBtn.addEventListener("click", () => {
   messageWindow.classList.remove("active");
   exitSetup();
});

newGameBtn.addEventListener("click", () => {
   messageWindow.classList.remove("active");
   exitSetup();
   initialSetupBeforeStart();
   startOnlineGame();
});