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
  var rock = $("<div class='btn-holder'><button class='btn btn-secondary btn-rps'> Rock </button></div>");
  var paper = $("<div class='btn-holder'><button class='btn btn-secondary btn-rps'> Paper </button></div>");
  var scissors = $("<div class='btn-holder'><button class='btn btn-secondary btn-rps'> Scissors </button></div>");
  var nameP = $("<p class=name>" + name + "</p>");
  var winsP = $("<p class='wins-losses'>Wins: <span id=wins-" + playerCount + ">" + wins + "</span> Losses: <span id=losses-" + playerCount + "></span>" + losses + "</p>");
  // var lossesP = $('<p class=\'losses\'>Losses: </p>');

  //create span tags
  var spanWin = $("<span>");
  var spanLos = $("<span>");

  //add the inital score
  // spanWin.text(wins);
  // spanLos.text(losses);

  //span ids as the players name so it's easier to replace later on in the game
  // spanWin.attr('id', 'wins-' + name);
  // spanLos.attr('id', 'losses-' + name);

  //append span to wins and losses
  // winsP.append(spanWin);
  // lossesP.append(spanLos);

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

function mainClickEvent() {

  $("#start").on('click', function() {

    if (playerCount === 1) {

      //get player
      myPlayer = $("#gamer-tag").val().trim();
      console.log(myPlayer);

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
  $("#start").on('click', function() {

  })
  }

  //remove input button
  function removeInput(name) {

    //gamer remove gamer tag
    $("#gamer-tag-div").children().remove();

    var helloMsg = $("<p>");
    var helloMsgSpan = $("<span>");
    var turnMsg = $("<p>");
    helloMsg.text('Hi ' + name + ' You are Player ' + playerCount);
    helloMsgSpan.attr('id', 'span-name');
    helloMsg.append(helloMsgSpan);
    turnMsg.text('it\'s your turn!');
    turnMsg.attr('id', 'turn-div');

    $("#gamer-tag-div").append(helloMsg)
    $("#gamer-tag-div").append(turnMsg)

  }

  //on load fill Blocks
  var firstRun = database.ref("players").on("child_added", function(childSnapshot, prevChildKey) {

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

    }else if (playerCount === 2 && !myPlayer) {
      $('#left-block').children('.btn-holder').remove();
    }
  });

  //turn off updating
  // database.ref("players").off('child_added');

  console.log(playerCount);
  mainClickEvent();

  $(document).on("click", ".btn", mainClickEvent);
