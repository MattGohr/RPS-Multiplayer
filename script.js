// Initialize Firebase
var config = {
  apiKey: "AIzaSyAIWrc7C-g6Zcd1P7yCIOBLjktV7ATU6q8",
  authDomain: "first-project-3fa4f.firebaseapp.com",
  databaseURL: "https://first-project-3fa4f.firebaseio.com",
  projectId: "first-project-3fa4f",
  storageBucket: "first-project-3fa4f.appspot.com",
  messagingSenderId: "128232668232"
};
firebase.initializeApp(config);

var database = firebase.database();

function mainClickEvent() {

  $("#butn").on('click', function(event) {
    event.preventDefault();
  });
}





$(document).on("click", ".btn", mainClickEvent);