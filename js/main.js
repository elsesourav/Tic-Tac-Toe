const onlineGame = new OnlineGame(options);
const offlineGame = new OfflineGame(options);

resetBtn.addEventListener("click", () => {
   sendRequested = false;
   switch (currentGameMode) {
      case "online":
         sendRequestForPlayAgain();
         break;
      case "offline":
         winLoseWindow.classList.remove("active");
         offlineGame.reset();
         break;
   }
});

exitBtn.addEventListener("click", () => {
   winLoseWindow.classList.remove("active");
   interfaceWindow.classList.add("active");
   headerElement.classList.remove("active");
   onlineGame.disable();
   offlineGame.disable();
   Game.removeAll(options);

   switch (currentGameMode) {
      case "online":
         break;
      case "offline":
         break;
   }
});

function startOfflineGame() {
   currentGameMode = "offline";
   onlineGame.disable();
   offlineGame.init();
}

function setupWinLoseStatus(name) {
   winLoseWindow.classList.add("active");
   winnerName.innerText = `${name === true ? "you are" : name + "'s"} Win!`;
}

function switchPlayer(turn) {
   headerElement.classList.remove(turn === "x" ? "o" : "x");
   headerElement.classList.add(turn);
}
function updateWinStatus(total, strike) {
   totalWinX.innerText = `👑 ${total.x}`;
   totalWinO.innerText = `👑 ${total.o}`;
   winStrikeX.innerText = `🏅 ${strike.x}`;
   winStrikeO.innerText = `🏅 ${strike.o}`;
}

function setupPlayerNames(nameX = "Player X", nameO = "Player O") {
   PLAYER_X.textContent = nameX;
   PLAYER_O.textContent = nameO;
   NAME_X.textContent = nameX;
   NAME_O.textContent = nameO;
}
