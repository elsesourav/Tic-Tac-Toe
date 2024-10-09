class Queue {
  constructor(size = 5) {
    this.size = size;
    this.q = [];
  }

  clear() {
    this.q = [];
  }

  add(e) {
    this.q.unshift(e);
    if (this.q.length > this.size) {
      return this.q.pop();
    }
    return null;
  }
}

class Sound {
  constructor(id) {
    this.sound = document.getElementById(id);
  }

  play() {
    this.sound.currentTime = 0;
    this.sound.play();
  }
}

const winRegex = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]