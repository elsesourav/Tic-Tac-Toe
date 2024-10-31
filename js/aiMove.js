class AiMove {
   constructor() {
      this.queue = new Queue();
      this.regex = [
         [
            [0, 0],
            [0, 1],
            [0, 2],
         ],
         [
            [1, 0],
            [1, 1],
            [1, 2],
         ],
         [
            [2, 0],
            [2, 1],
            [2, 2],
         ],
         [
            [0, 0],
            [1, 0],
            [2, 0],
         ],
         [
            [0, 1],
            [1, 1],
            [2, 1],
         ],
         [
            [0, 2],
            [1, 2],
            [2, 2],
         ],
         [
            [0, 0],
            [1, 1],
            [2, 2],
         ],
         [
            [0, 2],
            [1, 1],
            [2, 0],
         ],
      ];
      this.turn = null;
      this.board = [
         [" ", " ", " "],
         [" ", " ", " "],
         [" ", " ", " "],
      ];
   }

   #reset(cells) {
      this.queue.clear();
      this.#set_x_o_in_board(cells);
   }

   #hav([i, j], turn) {
      return this.board[i][j] === turn;
   }

   #isWin(turn) {
      return this.regex.some((com) =>
         com.every(([i, j]) => this.board[i][j] === turn)
      );
   }

   #getWinMove(t) {
      for (const combo of this.regex) {
         const [a, b, c] = combo;
         if (this.#hav(a, " ") && this.#hav(b, t) && this.#hav(c, t)) return a;
         if (this.#hav(a, t) && this.#hav(b, " ") && this.#hav(c, t)) return b;
         if (this.#hav(a, t) && this.#hav(b, t) && this.#hav(c, " ")) return c;
      }
      return null;
   }

   #getUnusedIndex() {
      const possibles = [];
      this.board.forEach((row, i) => {
         row.forEach((cell, j) => {
            if (cell !== "x" && cell !== "o") possibles.push(i * 3 + j);
         });
      });
      return possibles;
   }

   #set_x_o_in_board(cells) {
      this.board = [];
      cells.forEach((cell, i) => {
         if (i % 3 === 0) this.board.push([]);
         if (!cell.classList.contains("h")) {
            const turn = cell.classList.contains("x")
               ? "x"
               : cell.classList.contains("o")
                  ? "o"
                  : " ";
            this.board[this.board.length - 1].push(turn);
         }
      });
   }

   #minimax(board, depth, isMaximizing, alpha, beta) {
      if (this.#isWin("o")) return 10 - depth;
      if (this.#isWin("x")) return depth - 10;
      if (this.#getUnusedIndex().length === 0) return 0;

      if (isMaximizing) {
         let bestScore = -Infinity;
         for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
               if (board[i][j] === " ") {
                  board[i][j] = this.turn;
                  let score = this.#minimax(board, depth + 1, false, alpha, beta);
                  board[i][j] = " ";
                  bestScore = Math.max(score, bestScore);
                  alpha = Math.max(alpha, score);
                  if (beta <= alpha) break;
               }
            }
         }
         return bestScore;
      } else {
         let bestScore = Infinity;
         for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
               if (board[i][j] === " ") {
                  board[i][j] = this.opponent;
                  let score = this.#minimax(board, depth + 1, true, alpha, beta);
                  board[i][j] = " ";
                  bestScore = Math.min(score, bestScore);
                  beta = Math.min(beta, score);
                  if (beta <= alpha) break;
               }
            }
         }
         return bestScore;
      }
   }

   #findBestMoveWithAlphaBeta() {
      let bestScore = -Infinity;
      let move = null;

      for (let i = 0; i < 3; i++) {
         for (let j = 0; j < 3; j++) {
            if (this.board[i][j] === " ") {
               this.board[i][j] = this.turn;
               let score = this.#minimax(this.board, 0, false, -Infinity, Infinity);
               this.board[i][j] = " ";
               if (score > bestScore) {
                  bestScore = score;
                  move = { row: i, col: j };
               }
            }
         }
      }

      return move;
   }

   easy(cells) {
      if (cells) this.#reset(cells);
      const possibles = this.#getUnusedIndex();
      return possibles[Math.floor(Math.random() * possibles.length)];
   }

   normal(cells, turn) {
      this.turn = turn;
      this.opponent = turn === "x" ? "o" : "x";
      this.#reset(cells);

      let move = this.#getWinMove(turn);
      if (move !== null) return move[0] * 3 + move[1];

      move = this.#getWinMove(this.opponent);
      if (move !== null) return move[0] * 3 + move[1];

      return this.easy(cells);
   }

   hard(cells, turn) {
      this.turn = turn;
      this.opponent = turn === "x" ? "o" : "x";
      this.#reset(cells);

      const { row, col } = this.#findBestMoveWithAlphaBeta();
      return row * 3 + col;
   }
}
