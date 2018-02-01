/*

SORRY FOR THE MESSY CODE

*/


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
var myPlayer, deletPlayer2Btns, myPlayerNum, turn = 0;
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
  var rock = $("<div class='btn-holder'><button class='btn btn-secondary btn-rps' id=rock> Rock </button></div>");
  var paper = $("<div class='btn-holder'><button class='btn btn-secondary btn-rps' id=paper> Paper </button></div>");
  var scissors = $("<div class='btn-holder'><button class='btn btn-secondary btn-rps' id=scissors> Scissors </button></div>");
  var nameP = $("<p class=name>" + name + "</p>");
  var winsP = $("<p class='wins-losses'>Wins: <span id=wins-" + playerCount + ">" + wins + "</span> Losses: <span id=losses-" + playerCount + "></span>" + losses + "</p>");

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
  // $('#' + block).append(lossesP);
}

function rpsLogic () {
  var player1Choice = database.ref("players/1/choice").val();
  var player2Choice = database.ref("players/2/choice").val();

  console.log(player1Choice);

}

function mainClickEvent() {

  $("#start").on('click', function() {

    if (playerCount === 1) {

      //get player
      myPlayer = $("#gamer-tag").val().trim();
      console.log(myPlayer);
      myPlayerNum = 1;

      var newPlayer = {
        1: {
          name: myPlayer,
          wins: 0,
          losses: 0
        }
      }

      //add to database
      database.ref("players").update(newPlayer);
      removeInput(myPlayer)

    } else if (playerCount === 2) {
      //get variable
      myPlayer = $("#gamer-tag").val().trim();
      console.log(myPlayer);
      myPlayerNum = 2;

      var newPlayer = {
        2: {
          name: myPlayer,
          wins: 0,
          losses: 0
        }
      }

      //add to database
      database.ref("players").update(newPlayer);
      removeInput(myPlayer)

    } else if (playerCount === 2) {
      removeInput(myPlayer)
      console.log('too many players');
    }
  });

  //rps clicked
  $(".btn-rps").on('click', function() {
    console.log(this.id);

    //insert choice
    database.ref("players/" + myPlayerNum).update({choice: this.id});

    turn++;
    database.ref("players/turn").update(turn);

  })
}

//remove input button
function removeInput(name) {

  //gamer remove gamer tag
  $("#gamer-tag-div").children().remove();

  var helloMsg = $("<p>");
  var helloMsgSpan = $("<span>");
  var turnMsg = $("<p>");
  helloMsg.text('Hi ' + name + ' You are Player ' + (playerCount - 1));
  helloMsgSpan.attr('id', 'span-name');
  helloMsg.append(helloMsgSpan);
  turnMsg.text('it\'s your turn!');
  turnMsg.attr('id', 'turn-div');

  $("#gamer-tag-div").append(helloMsg)
  $("#gamer-tag-div").append(turnMsg)

}

//on load fill Blocks
database.ref("players").on("child_added", function(childSnapshot, prevChildKey) {

  fillBlock(Number(childSnapshot.key), childSnapshot.val().name, false, childSnapshot.val().wins, childSnapshot.val().losses);
  playerCount++;
  //myPlayer;
  console.log('PLayer count: ' + playerCount);

  //if too many players then tell them to come back later
  if (playerCount === 3 && !myPlayer) {
    //gamer remove gamer tag
    $("#gamer-tag-div").children().remove();

    //imput message
    var helloMsg = $("<p>");
    helloMsg.text('There are too many players right now please try again later :)');
    $("#gamer-tag-div").append(helloMsg);

    //remove the text from the block
    $('#right-block').children().remove();
    $('#left-block').children().remove();

    //om the first run delete the buttons on player 1
  } else if (playerCount === 2 && !myPlayer) {
    $('#left-block').children('.btn-holder').remove();

    //when enter playter 2 delete buttons for player 1
  } else if (playerCount === 3 && myPlayer && deletPlayer2Btns) {
    $('#right-block').children('.btn-holder').remove()

  } else if (playerCount === 2 && myPlayer) {
    deletPlayer2Btns = true;
  }

  if (turn === 2) {
    rpsLogic();
  }
});

//turn off updating
// database.ref("players").off('child_added');

console.log(playerCount);
mainClickEvent();

$(document).on("click", ".btn", mainClickEvent);
$(window).on('unload', function(){
   database.ref("players/" + myPlayerNum).remove();
});
