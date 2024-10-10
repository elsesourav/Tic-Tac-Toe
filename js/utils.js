"use strict";

/* ----  local storage set and get ---- */
function setLocal(key, object) {
   let data = JSON.stringify(object);
   localStorage.setItem(key, data);
}

function getLocal(key) {
   return JSON.parse(localStorage.getItem(key));
}

function removeLocal(key) {
   localStorage.removeItem(key);
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

   set(newQueue) {
      this.q = newQueue;
   }

   get() {
      return this.q;
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
