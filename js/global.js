const USER_NAME_KEY = "ttt-username";
const firebaseConfig = {
   apiKey: "AIzaSyCSH9sMaawAEMzYiPnIbwTUYBU9lchXOjU",
   authDomain: "tictactoe-sb.firebaseapp.com",
   projectId: "tictactoe-sb",
   storageBucket: "tictactoe-sb.appspot.com",
   messagingSenderId: "93189806950",
   appId: "1:93189806950:web:c99dab2cbc6e8758e446a7",
   measurementId: "G-1885GLWFEH",
};

// initialize
(() => {
   const usernameForm = document.getElementById("usernameForm");
   const username = getLocal(USER_NAME_KEY);

   if (!username) {
      usernameForm.classList.add("active");
   }
})();
