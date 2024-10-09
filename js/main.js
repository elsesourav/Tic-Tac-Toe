const options = document.querySelectorAll("#board span");
const winLoseWindow = document.getElementById("winLoseWindow");
const resetBtn = document.getElementById("reset");

const game =  new Game(options, winLoseWindow);

// game.init();

resetBtn.addEventListener("click", () => {
   game.reset();
});
