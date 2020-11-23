console.log("connected");

let playerURL, compURL, playShip, compShip;

function getURL() {
  let link = "http://swapi.dev/api/starships/";
  let arr = [2, 3, 5, 9, 10, 11, 12, 13, 15, 21, 22, 23];
  let playRandom = Math.floor(Math.random() * 12);
  return link + arr[playRandom];
}

function checkDuplicate(p1, c1) {
  if (p1 === c1) {
    compURL = getURL;
    console.log("Switched");
  }
}

function newGame() {
  $("#computer").addClass("hidden");
  $("#result").empty();

  playerURL = getURL();
  compURL = getURL();

  checkDuplicate(playerURL, compURL);

  $.when(
    $.getJSON(playerURL, function (data) {}),
    $.getJSON(compURL, function (json) {})
  ).then(function (player, computer) {
    playShip = player[0];
    compShip = computer[0];

    $("#buttons button").removeClass("disabled");

    $("#player").html(formatDisplay(playShip));
    $("#computer").html(formatDisplay(compShip));

    let pCost = getVari(playShip.cost_in_credits);
    let cCost = getVari(compShip.cost_in_credits);
    let pMax = getVari(playShip.max_atmosphering_speed);
    let cMax = getVari(compShip.max_atmosphering_speed);
    let pHyper = getVari(playShip.hyperdrive_rating);
    let cHyper = getVari(compShip.hyperdrive_rating);
    let pMGLT = getVari(playShip.MGLT);
    let cMGLT = getVari(compShip.MGLT);

    $("#cost").on("click", function () {
      compare(pCost, cCost);
    });
    $("#max").on("click", function () {
      compare(pMax, cMax);
    });
    $("#hyper").on("click", function () {
      compare(pHyper, cHyper);
    });
    $("#MGLT").on("click", function () {
      compare(pMGLT, cMGLT);
    });
  });
}

$(document).ready(function () {
  newGame();
  $("#newGame").on("click", newGame);
});

function compare(p1, c1) {
  $("#computer").removeClass("hidden");
  if (p1 > c1) {
    $("#result").html("The force is with you (You win!)");
  } else if (c1 > p1) {
    $("#result").html("You will never defeat the dark side (You lose)");
  } else if (p1 === c1) {
    $("#result").html("Do, or do not, it is a tie");
  } else {
    $("#result").html(
      "I've got a bad feeling about this (something went wrong...)"
    );
  }
  $("#buttons button").addClass("disabled");
}

function getVari(category) {
  let returnVal;
  if (isNaN(parseInt(category))) {
    returnVal = 0;
  } else {
    returnVal = parseInt(category);
  }
  return returnVal;
}

function formatDisplay(name) {
  return (
    "<span class='card-title'>" +
    name.name +
    "</span><p>Model: " +
    name.model +
    "</p><p>Cost: " +
    name.cost_in_credits +
    "</p><p>Max Atmos Spd: " +
    name.max_atmosphering_speed +
    "</p><p>Hyperdrive Rtg: " +
    name.hyperdrive_rating +
    "</p><p>MGLT: " +
    name.MGLT +
    "</p>"
  );
}
