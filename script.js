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
var player = 0;
var player1, player2;

function fillBlock(block, name) {
  var NameP = $('<p>');
  NameP.text(name);

  var Rock = $("<button class=\'btn btn-secondary\'> Rock </button>");
  var Paper = $("<button class=\'btn btn-secondary\'> Paper </button>");
  var Scissors = $("<button class=\'btn btn-secondary\'> Scissors </button>");

  Paper.append(Scissors);


  $('#' + block).append()
  $('#' + block).append("<button class=\'btn btn-secondary\'> Paper </button>")
  $('#' + block).append("<button class=\'btn btn-secondary\'> Scissors </button>")


  $('#' + block).append();
}

function mainClickEvent() {

  $("#start").on('click', function() {

    if (player === 0) {
      player++;

      player1 = $("#gamer-tag").val().trim();
      console.log(player1);
      fillBlock('left-block', player1);


    } else if (player === 1) {
      player++;

      player2 = $("#gamer-tag").val().trim();
      console.log(player2);

      fillBlock('left-block', player1);
    }

  });


}





$(document).on("click", ".btn", mainClickEvent);