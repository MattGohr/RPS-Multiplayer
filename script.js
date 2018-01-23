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
//playercount
var playerCount = 0;
var myPlayer;
var chosen = false;

function fillBlock(playerNum, name, skip, wins, losses) {

  //decide what block to put data into depending on the key
  if (playerNum === 1) {
    var block = "left-block";
  } else if (playerNum === 2) {
    var block = "right-block";
  }
  //remove the text from the block
  $('#' + block).children().remove();

  //init elements
  var NameP = $('<p>');
  NameP.text(name);
  var rock = $("<div class='btn-holder'><button class=\'btn btn-secondary\'> Rock </button></div>");
  var paper = $("<div class='btn-holder'><button class=\'btn btn-secondary\'> Paper </button></div>");
  var scissors = $("<div class='btn-holder'><button class=\'btn btn-secondary\'> Scissors </button></div>");
  var nameP = $('<p class=\'name\'>' + name + '</p>');
  var winsP = $('<p class=\'wins\'>Wins: </p>');
  var lossesP = $('<p class=\'losses\'>Losses: </p>');

  //create span tags
  var spanWin = $("<span>");
  var spanLos = $("<span>");

  //add the inital score
  spanWin.text(wins);
  spanLos.text(losses);

  //span ids as the players name so it's easier to replace later on in the game
  spanWin.attr('id', 'wins-' + name);
  spanLos.attr('id', 'losses-' + name);

  //append span to wins and losses
  winsP.append(spanWin);
  lossesP.append(spanLos);

  // add all the stuff to the block
  $('#' + block).append(nameP);

  //skip the adding of rock
  if (skip === true) {
    $('#' + block).append('')
  } else {
    $('#' + block).append(rock);
    $('#' + block).append(paper);
    $('#' + block).append(scissors);
  }
  $('#' + block).append(winsP);
  $('#' + block).append(lossesP);
}

function determinPlayer(something) {


  //if player then
}

function mainClickEvent() {

  $("#start").on('click', function() {

    if (playerCount === 0) {

      //get player
      player1 = $("#gamer-tag").val().trim();
      console.log(player1);

      var newPlayer = {
        1: {
          name: player1,
          wins: 0,
          losses: 0
        }
      }

      //add to database
      database.ref("players").update(newPlayer);
      removeInput(player1, playerCount)

    } else if (playerCount === 1) {
      //get variable
      player2 = $("#gamer-tag").val().trim();
      console.log(player2);

      var newPlayer = {
        2: {
          name: player2,
          wins: 0,
          losses: 0
        }
      }

      //add to database
      database.ref("players").update(newPlayer);
      removeInput(player2, playerCount)

    } else if (playerCount === 2) {
      removeInput(playerCount)
      console.log('too many players');
    }
  });
}

//remove input button
function removeInput(name, playerNum) {

  if (chosen === false) {
    //do not delete and say you are player x

  }
  //gamer remove gamer tag
  $("#gamer-tag-div").children().remove();

  var helloMsg = $("<p>");
  helloMsg.text('Hi ' + name + ' You are Player ');
  var helloMsgSpan = $("<span>");
  helloMsgSpan.attr('id', 'span-name');
  helloMsg.append(helloMsgSpan);
  var turnMsg = $("<p>");
  turnMsg.text('it\'s your turn!');
  turnMsg.attr('id', 'turn-div');

  $("#gamer-tag-div").append(helloMsg)
  $("#gamer-tag-div").append(turnMsg)

}

console.log('before added');
//on load fill Blocks
var firstRun = database.ref("players").on("child_added", function(childSnapshot, prevChildKey) {

  fillBlock(Number(childSnapshot.key), childSnapshot.val().name, false, childSnapshot.val().wins, childSnapshot.val().losses);
  playerCount++;
  //myPlayer;
  console.log(playerCount + 'second time');
});

// firstRun;

console.log(playerCount);
mainClickEvent();

$(document).on("click", ".btn", mainClickEvent);