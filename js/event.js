const usernameSubmit = document.getElementById("usernameSubmit");
const usernameField = document.getElementById("usernameField");
const usernameForm = document.getElementById("usernameForm");

usernameSubmit.addEventListener("click", (event) => {
   event.preventDefault();
   const username = usernameField.value;
   setLocal(USER_NAME_KEY, username);
   usernameForm.classList.remove("active");
});



// setTimeout(() => {
//    const searchingWindow = document.getElementById("searchingWindow");
//    searchingWindow.classList.add("found");

//    document.getElementById("player1").textContent = "John";
//    document.getElementById("player2").textContent = "Doe";
// }, 3000);
