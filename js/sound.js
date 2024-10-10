class Sound {
   constructor(id) {
      this.sound = document.getElementById(id);
   }
   play() {
      this.sound.currentTime = 0;
      this.sound.play();
   }
}

class Sounds {
   constructor() {
      this.win = new Sound("a-win");
      this.lose = new Sound("a-lose");
      this.x = new Sound("a-x");
      this.o = new Sound("a-o");
   }
}