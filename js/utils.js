"use strict";

/* ----  local storage set and get ---- */
function setDataFromLocalStorage(key, object) {
  let data = JSON.stringify(object);
  localStorage.setItem(key, data);
}

function getDataFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

const debounce = (func, delay = 1000) => {
  let debounceTimer;
  return function (...args) {
     const context = this;
     clearTimeout(debounceTimer);
     debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

//use cssRoot.style.setProperty("key", "value");
const rootStyle = document.querySelector(":root").style;
const isMobile =
  localStorage.mobile ||
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0;

if (!isMobile) rootStyle.setProperty("--cursor", "pointer");

/**
 * @param {number} ms
 **/
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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