const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let gameRef;

async function startOnlineGame() {
   currentGameMode = "online";
   offlineGame.disable();
   const gamesRef = db.ref("games");
   searchingWindow.classList.add("active");

   let foundRoom = false;
   const snapGames = await gamesRef.get();

   if (snapGames.exists()) {
      const games = snapGames.val();

      if (typeof games === "object") {
         for (let gameId in games) {
            let game = games[gameId];

            if (!game.playerX) {
               gameRef = db.ref("games/" + gameId);
               gameRef.update({
                  playerX: true,
                  board: [],
                  turn: "x",
                  playAgainRequest: null,
                  nameX: nickName,
               });
               gameRef.child("playerX").onDisconnect().set(false);
               foundRoom = true;
               goLive("x");
               break;
            } else if (!game.playerO) {
               gameRef = db.ref("games/" + gameId);
               gameRef.update({
                  playerO: true,
                  nameO: nickName,
               });
               gameRef.child("playerO").onDisconnect().set(false);
               foundRoom = true;
               goLive("o");
               break;
            }
         }
      }
   }

   if (!foundRoom) {
      createNewRoom();
   }
}

function createNewRoom() {
   gameRef = db.ref("games").push();

   gameRef.set({
      playerX: true,
      playerO: false,
      nameX: nickName,
      turn: "x",
      playAgainRequest: null,
   });
   gameRef.child("playerX").onDisconnect().set(false);
   goLive("x");
}

function goLive(turn) {
   let first = true;
   onlineGame.init(turn, gameRef, "x");

   gameRef.on("value", async (snapshot) => {
      const gameData = snapshot.val();

      if (gameData.playerX && gameData.playerO) {
         if (first) {
            searchingWindow.classList.add("found");
            setupPlayerNames(gameData.nameX, gameData.nameO);

            await wait(3000);
            searchingWindow.classList.remove("active", "found");
            first = false;
         }

         if (onlineGame.turn === gameData.turn) {
            onlineGame.enable();
         }

         if (gameData.board && !gameData.playAgainRequest) {
            onlineGame.update(gameData);
         }

         // play again request handle
         if (gameData.playAgainRequest === "send") {
            winLoseWindow.classList.remove("request");
            winLoseWindow.classList.remove("me");
            await wait(100);
            const isMe = gameData.whoRequest === onlineGame.turn;
            winLoseWindow.classList.add("request");
            isMe && winLoseWindow.classList.add("me");
         }

         if (gameData.playAgainRequest === "accepted") {
            searchingWindow.classList.add("active", "found");
            winLoseWindow.classList.remove("active", "request");
            onlineGame.reset(onlineGame.turn, gameRef, gameData.turn);
            alreadyRequested = false;

            await wait(3000);
            searchingWindow.classList.remove("active", "found");
         }
      } else if (!first) {
         const isAnyOneWin = onlineGame.checkWinBoth();
         const whoIsOff = gameData.playerX ? gameData.nameX : gameData.nameO;

         if (isAnyOneWin) {
            winLoseWindow.classList.remove("request");
            winLoseWindow.classList.add("leave");
            leaveTheGame();
         } else if (whoIsOff === nickName) {
            messageWindow.classList.add("active");
            leaveTheGame();
         }
      }
   });
}

function canAccepted(snapshot, time = 10500) {
   const data = snapshot.val();

   return (
      snapshot.exists() &&
      data.playAgainRequest === "send" &&
      Date.now() - data.sendTime < time
   );
}

async function sendRequestForPlayAgain() {
   if (alreadyRequested) return;
   alreadyRequested = true;
   const snapshot = await gameRef.get();
   const is = canAccepted(snapshot);

   if (is) {
      await gameRef.update({
         playAgainRequest: "accepted",
         board: null,
         sendTime: null,
      });
   } else {
      gameRef.update({
         playAgainRequest: "send",
         whoRequest: onlineGame.turn,
         sendTime: Date.now(),
      });
   }
   setTimeout(() => (alreadyRequested = false), 11000);
}

async function leaveTheGame() {
   await gameRef.child(`player${onlineGame.turn.toUpperCase()}`).set(false);
   await gameRef.off();
}
