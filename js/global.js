const USER_NAME_KEY = "ttt-username";
const firebaseConfig = {
   apiKey: "AIzaSyCSH9sMaawAEMzYiPnIbwTUYBU9lchXOjU",
   authDomain: "tictactoe-sb.firebaseapp.com",
   databaseURL: "https://tictactoe-sb-default-rtdb.asia-southeast1.firebasedatabase.app",
   projectId: "tictactoe-sb",
   storageBucket: "tictactoe-sb.appspot.com",
   messagingSenderId: "93189806950",
   appId: "1:93189806950:web:0702bdbb83232eeae446a7",
   measurementId: "G-2DBG26YHTW"
};

let nickName, username, currentGameMode;
let sendRequested = false;

// initialize
(() => {
   const usernameForm = document.getElementById("usernameForm");
   const user = getLocal(USER_NAME_KEY);

   if (!user) {
      usernameForm.classList.add("active");
   } else {
      nickName = user.username;
      username = user.userRef;
   }
})();


