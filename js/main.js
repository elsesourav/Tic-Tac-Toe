const options = document.querySelectorAll("#board span");
const floatingWindow = document.getElementById("floatingWindow");
const resetBtn = document.getElementById("reset");

const game =  new Game(options, floatingWindow, resetBtn);
