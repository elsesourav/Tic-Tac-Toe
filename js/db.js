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
            console.log("send request");

            winLoseWindow.classList.remove("request");
            await wait(100);
            winLoseWindow.classList.add("request");
         }
         if (gameData.playAgainRequest === "accepted") {
            console.log("accepted request");

            searchingWindow.classList.add("active", "found");
            winLoseWindow.classList.remove("active", "request");
            onlineGame.reset();
            
            await wait(3000);
            searchingWindow.classList.remove("active", "found");
         }
      } else if (!first) {
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
   if (sendRequested) return;
   sendRequested = true;
   const snapshot = await gameRef.get();

   const is = canAccepted(snapshot);

   if (is) {
      console.log("accepted");
      await gameRef.update({
         playAgainRequest: "accepted",
         board: null,
         sendTime: null,
      });
   } else {
      console.log("send");

      gameRef.update({ playAgainRequest: "send", sendTime: Date.now() });
   }
   setTimeout(() => (sendRequested = false), 11000);
}

// function makeMove(index) {
//    gameRef.once("value", (snapshot) => {
//       const gameData = snapshot.val();
//       if (gameData.turn === player && !gameData.board[index]) {
//          gameData.board[index] = player;
//          gameData.turn = player === "x" ? "o" : "x";
//          gameRef.update({ board: gameData.board, turn: gameData.turn });
//          checkWin(gameData.board);
//       }
//    });
// }

// Update the board UI based on the game state
// function updateBoard(board) {
//    const cells = document.querySelectorAll(".cell");
//    board.forEach((value, index) => {
//       cells[index].textContent = value;
//    });
// }

// Check if there is a winner or if it's a draw

// Reset the game after a win or draw
function resetGame() {
   gameRef.update({
      board: Array(9).fill(null),
      turn: "x",
   });
}
