class Game {
   constructor(cells) {
      this.cells = cells;
      this.turn = "x";
      this.start = true;
      this.queue = new Queue();
      this.regex = [
         [0, 1, 2],
         [3, 4, 5],
         [6, 7, 8],
         [0, 3, 6],
         [1, 4, 7],
         [2, 5, 8],
         [0, 4, 8],
         [2, 4, 6],
      ];
      this.sounds = new Sounds();
   }

   resetBoard(turn = this.turn) {
      this.turn = turn;
      this.queue.clear();
      this.start = true;
      this.cells.forEach((cell) => {
         cell.classList = [];
      });
      this.addFakes();
   }

   checkWin(turn = this.turn) {
      const possibles = [...this.cells].reduce(
         (a, c, i) => (c.classList.contains(turn) ? a.concat(i) : a),
         []
      );
      return this.regex.some((row) => row.every((e, i) => e === possibles[i]));
   }

   checkWinBoth() {
      if (this.checkWin("x")) return "x";
      if (this.checkWin("o")) return "o";
      return null;
   }

   isNotContent(e, ary = []) {
      return ary.every((c) => !e.classList.contains(c));
   }

   removeOld() {
      this.cells.forEach((e) => {
         if (e.classList.contains("t")) {
            e.classList = [];
         }
      });
   }

   addFakes() {
      this.cells.forEach((e) => {
         e.classList.add(this.turn, "h");
      });
   }

   removeAll() {
      this.cells.forEach((e) => (e.classList = []));
   }

   static removeAll(cells) {
      cells.forEach((e) => (e.classList = []));
   }

   disableBoard() {
      this.cells.forEach((e) => e.classList.add("hide-pointer"));
   }

   enableBoard() {
      this.cells.forEach((e) => e.classList.remove("hide-pointer"));
   }

   endAnimation(turn = this.turn) {
      this.cells.forEach((e) => {
         if (e.classList.contains(turn)) {
            e.classList.add("end");
         }
      });
   }

   hideWhoIsLose(turn = this.turn) {
      const tempTurn = turn == "x" ? "o" : "x";
      this.disableBoard();
      this.cells.forEach((e) => {
         if (e.classList.contains(tempTurn)) {
            e.classList.add("h");
         }
      });
   }
}

/* --------------------------------------------------------------------------
                           ONLINE GAME CLASS
-------------------------------------------------------------------------- */
class OnlineGame extends Game {
   constructor(cells) {
      super(cells);
      this.gameRef;
      this.is = false;
      this.g;
      this.#addEvent();
      this.resetBoard();
   }

   init(turn, gameRef, turnG) {
      this.wineStrike = { x: 0, o: 0 };
      this.totalWin = { x: 0, o: 0 };
      this.reset(turn, gameRef, turnG);
   }

   enable() {
      this.is = true;
      this.cells.forEach((cell) => cell.classList.remove("hide-pointer"));
   }

   disable() {
      this.is = false;
      this.cells.forEach((cell) => cell.classList.add("hide-pointer"));
   }

   reset(turn = this.turn, gameRef = this.gameRef, turnG = this.turnG) {
      updateWinStatus(this.totalWin, this.wineStrike);
      switchPlayer(turnG || turn);
      this.gameRef = gameRef;
      this.opoTurn = turn === "x" ? "o" : "x";
      this.resetBoard(turn);
   }

   update(game) {
      const board = game.board || [];
      this.g = game;
      let old;
      if (!this.start && game.turn === this.turn)
         this.sounds[this.opoTurn].play();

      if (this.start) {
         this.start = false;
         this.removeAll();
      }

      this.queue.clear();

      for (let i = board.length - 1; i >= 0; i--) {
         old = this.queue.add(board[i]);
      }
      this.queue.get().forEach((e) => {
         this.cells[e.index].classList.add(e.turn);
      });

      this.removeOld();
      const is = this.#isWin();
      !is && switchPlayer(game.turn);
      if (old) this.cells[old.index].classList.add("t");
   }

   #updateWinDetails(turn) {
      const user = turn === this.turn || this.g[`name${turn.toUpperCase()}`];
      setupWinLoseStatus(user);
      this.totalWin[turn] += 1;
      this.wineStrike[turn] += 1;
      this.wineStrike[turn === "x" ? "o" : "x"] = 0;
      updateWinStatus(this.totalWin, this.wineStrike);
   }

   #isWin() {
      const is = this.checkWinBoth();

      if (is !== null) {
         const W_L = this.turn === is ? "win" : "lose";
         console.log(W_L);

         this.sounds[W_L].play();
         this.endAnimation(is);
         this.hideWhoIsLose(is);
         this.#updateWinDetails(is);
         winLoseWindow.classList.add("active");
      }
      return is;
   }

   async #click(index, e) {
      if (this.start) {
         this.start = false;
         this.removeAll();
      }
      const { turn } = this;
      const board = [...this.queue.get()];

      e.classList.add(turn);
      this.sounds[turn].play();

      const snapshot = await this.gameRef.get();
      const gameData = snapshot.val();

      const opoTurn = turn === "x" ? "o" : "x";
      const is = this.checkWin() || null;
      delete gameData.turn;
      delete gameData.board;
      if (gameData.playAgainRequest) delete gameData.playAgainRequest;

      board.unshift({ index, turn });
      gameRef.set({ ...gameData, turn: opoTurn, board });

      this.disable();
   }

   #addEvent() {
      this.cells.forEach((e, i) => {
         e.addEventListener("click", () => {
            if (this.is && (this.isNotContent(e, ["x", "o"]) || this.start)) {
               this.#click(i, e);
            }
         });
      });
   }
}

/* --------------------------------------------------------------------------
                              OFFLINE GAME CLASS
-------------------------------------------------------------------------- */
class OfflineGame extends Game {
   constructor(cells) {
      super(cells);
      this.is = false;
      this.#addEvent();
      this.resetBoard();
   }

   init() {
      this.wineStrike = { x: 0, o: 0 };
      this.totalWin = { x: 0, o: 0 };
      setupPlayerNames();
      this.#randomTurn();
      this.reset();
   }

   enable() {
      this.is = true;
   }

   disable() {
      this.is = false;
   }

   reset() {
      this.enable();
      this.resetBoard();
      switchPlayer(this.turn);
      updateWinStatus(this.totalWin, this.wineStrike);
   }

   #randomTurn() {
      this.turn = Math.random() > 0.5 ? "o" : "x";
   }

   #updateWinDetails() {
      setupWinLoseStatus(this.turn);
      this.totalWin[this.turn] += 1;
      this.wineStrike[this.turn] += 1;
      this.wineStrike[this.turn === "x" ? "o" : "x"] = 0;
      updateWinStatus(this.totalWin, this.wineStrike);
   }

   #isWin() {
      const is = this.checkWin();

      if (is) {
         this.sounds.win.play();
         this.endAnimation();
         this.hideWhoIsLose();
         this.#updateWinDetails();
      }
      return is;
   }

   #click(e) {
      if (this.start) {
         this.start = false;
         this.removeAll();
      }

      this.sounds[this.turn].play();
      e.classList.add(this.turn);
      this.removeOld();
      const is = this.#isWin();
      this.turn = this.turn == "x" ? "o" : "x";
      !is && switchPlayer(this.turn);

      const old = this.queue.add(e);
      if (old) old.classList.add("t");
   }

   #addEvent() {
      this.cells.forEach((e) => {
         e.addEventListener("click", () => {
            if (this.is && (this.isNotContent(e, ["x", "o"]) || this.start)) {
               this.#click(e);
            }
         });
      });
   }
}
