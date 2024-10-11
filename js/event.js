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


usernameSubmit.addEventListener("click", (event) => {
   event.preventDefault();
   const nickName = usernameField.value;
   setLocal(USER_NAME_KEY, {
      username: nickName,
      userRef: nickName.toLowerCase() + Date.now()
   });
   window.location.reload();
});


playOnlineBtn.addEventListener("click", () => {
   interfaceWindow.classList.remove("active");
   headerElement.classList.add("active");
   startOnlineGame();
});

playOfflineBtn.addEventListener("click", () => {
   interfaceWindow.classList.remove("active");
   headerElement.classList.add("active");
   startOfflineGame();
});
