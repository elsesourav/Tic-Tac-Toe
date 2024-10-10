const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let gameRef;

async function startOnlineGame() {
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
                  XName: nickName,
               });
               gameRef.child("playerX").onDisconnect().set(false);
               foundRoom = true;
               goLive("x");
               break;
            } else if (!game.playerO) {
               gameRef = db.ref("games/" + gameId);
               gameRef.update({
                  playerO: true,
                  OName: nickName,
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
      XName: nickName,
      turn: "x",
      isActive: true,
      timestamp: Date.now(),
   });
   gameRef.child("playerX").onDisconnect().set(false);
   goLive("x");
}

function goLive(turn) {
   let first = true;
   onlineGame.reset(turn, gameRef);

   gameRef.on("value", async (snapshot) => {
      const gameData = snapshot.val();

      if (gameData.playerX && gameData.playerO) {
         if (first) {
            searchingWindow.classList.add("found");
            PLAYER_X.textContent = gameData.XName;
            PLAYER_O.textContent = gameData.OName;

            await wait(3000);
            searchingWindow.classList = [];
            first = false;
         }

         if (onlineGame.turn === gameData.turn) {
            onlineGame.enable();
         }

         if (gameData.board) onlineGame.update(gameData);
      }
   });
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
