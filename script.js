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
  $('#' + block).children().remove()
  var rock = $("<button class=\'btn btn-secondary\'> Rock </button>");
  var paper = $("<button class=\'btn btn-secondary\'> Paper </button>");
  var scissors = $("<button class=\'btn btn-secondary\'> Scissors </button>");
  var p = $('<p class=\'name\'>' + name + '</p>');
  var wins = $('<p class=\'wins\'>Wins: </p>');
  var losses = $('<p class=\'losses\'>Losses: </p>');

  var spanWin = $("<span>");
  var spanLos = $("<span>");

  wins.append(spanWin);
  losses.append(spanLos);

  spanWin.text('0');
  spanLos.text('0');

  spanWin.attr('id', 'wins-' + name);
  spanLos.attr('id', 'losses-' + name);

  $('#' + block).append(p);
  $('#' + block).append(rock);
  $('#' + block).append(paper);
  $('#' + block).append(scissors);
  $('#' + block).append(wins);
  $('#' + block).append(losses);
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

      fillBlock('right-block', player1);
    }

  });


}



mainClickEvent();

$(document).on("click", ".btn", mainClickEvent);