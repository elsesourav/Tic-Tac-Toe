const onlineGame = new OnlineGame(options);
const offlineGame = new OfflineGame(options);

resetBtn.addEventListener("click", () => {
   winLoseWindow.classList.remove("active");
   switch (currentGameMode) {
      case "online":
         onlineGame.reset();
         break;
      case "offline":
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
   winnerName.innerText = `${name.toUpperCase()}'s Win!`;
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