class Game {
   constructor(elements, fw, resetBtn, winReg = winRegex) {
      this.es = elements;
      this.fw = fw;
      this.resetBtn = resetBtn;
      this.winReg = winReg;
      this.turn;
      this.start = false;
      this.q = new Queue();
      this.sounds = {
         win: new Sound("a-win"),
         lose: new Sound("a-lose"),
         x: new Sound("a-x"),
         o: new Sound("a-o"),
      };
      this.reset();
      this.#addEvent();
   }

   randomTurn() {
      this.turn = Math.random() > 0.5 ? "o" : "x";
   }

   reset() {
      this.fw.classList.remove("active");
      this.es.forEach((o) => (o.classList = []));
      this.q.clear();
      this.randomTurn();
      this.#addFakes();
   }

   #isNotContent(e, ary = []) {
      return ary.every((c) => !e.classList.contains(c));
   }

   #removeOld() {
      this.es.forEach((e) => {
         if (e.classList.contains("t")) {
            e.classList = [];
         }
      });
   }

   #addFakes() {
      this.start = false;
      this.es.forEach((e) => {
         e.classList.add(this.turn, "h");
      });
   }

   #removeFakes() {
      this.start = true;
      this.es.forEach((e) => (e.classList = []));
   }

   #hideLose() {
      const tempTurn = this.turn == "x" ? "o" : "x";
      this.es.forEach((e) => {
         e.classList.add("hide-pointer");
         if (e.classList.contains(tempTurn)) {
            e.classList.add("h");
         }
      });
   }

   #winAnimation() {
      const tempTurn = this.turn;
      this.es.forEach((e) => {
         if (e.classList.contains(tempTurn)) {
            e.classList.add("win");
         }
      });
   }

   #checkWin() {
      const possible = [...this.es]
         .map((e, i) => {
            if (e.classList.contains(this.turn)) return i;
            return null;
         })
         .filter((e) => e !== null);

      const is = this.winReg.some((row) =>
         row.every((e, i) => e === possible[i])
      );

      if (is) {
         this.sounds.win.play();
         this.#winAnimation();
         this.#hideLose();
         this.fw.classList.add("active");
      }
   }

   #click(e) {
      if (!this.start) this.#removeFakes();

      this.sounds[this.turn].play();
      e.classList.add(this.turn);
      this.#removeOld();
      this.#checkWin();
      this.turn = this.turn == "x" ? "o" : "x";

      const old = this.q.add(e);
      if (old) old.classList.add("t");
   }

   #addEvent() {
      this.es.forEach((e) => {
         e.addEventListener("click", () => {
            if (this.#isNotContent(e, ["x", "o"]) || !this.start)
               this.#click(e);
         });
      });

      this.resetBtn.addEventListener("click", () => {
         this.reset();
      });
   }
}
