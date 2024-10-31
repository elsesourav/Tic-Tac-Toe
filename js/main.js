const onlineGame = new OnlineGame(options);
const offlineGame = new OfflineGame(options);
const aiGame = new AiGame(options);

resetBtn.addEventListener("click", () => {
   switch (currentGameMode) {
      case "online":
         sendRequestForPlayAgain();
         break;
      case "offline":
         winLoseWindow.classList.remove("active");
         offlineGame.reset();
         break;
      case "ai":
         winLoseWindow.classList.remove("active");
         aiGame.reset(difficulty);
         break;
   }
});

function exitSetup() {
   winLoseWindow.classList.remove("active");
   headerElement.classList.remove("active");
   interfaceWindow.classList.add("active");
   onlineGame.disable();
   offlineGame.disable();
   Game.removeAll(options);
}

exitBtn.addEventListener("click", () => {
   exitSetup();

   if (currentGameMode === "online") {
      leaveTheGame();
   }
});

function startOfflineGame() {
   currentGameMode = "offline";
   onlineGame.disable();
   aiGame.disable();
   offlineGame.init();
}

function startAiGame(difficulty) {
   currentGameMode = "ai";
   onlineGame.disable();
   offlineGame.disable();
   aiGame.init(difficulty);
}

function setupWinLoseStatus(name, isForAi = false) {
   winLoseWindow.classList.add("active");
   if (isForAi) {
      winnerName.innerHTML = name;
   } else {
      winnerName.innerText = `${name === true ? "you are" : name + "'s"} Win!`;
   }
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

function setupPlayerNames(nameX = "Player X", nameO = "Player O", isForAi = false) {
   if (isForAi) {
      PLAYER_X.innerHTML = NAME_X.innerHTML = nameX;
      PLAYER_O.innerHTML = NAME_O.innerHTML = nameO;
   } else {
      PLAYER_X.textContent = NAME_X.textContent = nameX;
      PLAYER_O.textContent = NAME_O.textContent = nameO;
   }
}
