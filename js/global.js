const USER_NAME_KEY = "ttt-username";




// initialize
(() => {
   const usernameForm = document.getElementById("usernameForm");
   const username = getLocal(USER_NAME_KEY);
   
   if (!username) {
      usernameForm.classList.add("active");
   }
})();