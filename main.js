(function () {
  //Game variables
  var guessNumber = Math.ceil(Math.random() * 100);
  var playerGuess = 0;
  var guessesRemaining = 10;
  var guessesMade = 0;
  var gameState = "";
  var gameWon = false;

  console.log(guessNumber); //cheating :))

  //The input and output fields
  var input = document.querySelector("#input");
  var output = document.querySelector("#output");

  //The button
  var button = document.querySelector("button");
  button.addEventListener("click", clickHandler, false);
  button.style.cursor = "pointer";

  //The arrow
  var arrow = document.querySelector("#arrow");

  //Run game with enter from keyboard
  window.addEventListener("keydown", keydownHandler, false);
  function keydownHandler(e) {
    if (e.code === "Enter") {
      validateInput();
    }
  }
  //Handler function
  function clickHandler() {
    validateInput();
  }

  //Validate the imput of user for number checking
  function validateInput() {
    playerGuess = parseInt(input.value);
    if (isNaN(playerGuess)) {
      output.innerHTML = "Please enter a number!";
    } else if (playerGuess < 0 || playerGuess > 100) {
      output.innerHTML = "< Please enter a number between 0 - 99 >";
    } else {
      playGame();
    }
  }

  function render() {
    //Positioning the arrow on the scale
    //Multipy the guessing value by 3 (becouse the scale is 3 times
    // more in pixels than the maximul guessing number 100)
    arrow.style.left = playerGuess * 3 + "px";
  }

  //PlayGame function
  function playGame() {
    input.value = "";
    guessesRemaining += -1;
    guessesMade += 1;
    gameState =
      " Guess: " + guessesMade + "<br> Remaining: " + guessesRemaining;
    if (playerGuess > guessNumber) {
      output.innerHTML = "Number is to high!" + gameState;
      //Check for the end of the game
      if (guessesRemaining < 1) {
        endGame();
      }
    } else if (playerGuess < guessNumber) {
      output.innerHTML = "Number is to small!" + gameState;
      //Check for the end of the game
      if (guessesRemaining < 1) {
        endGame();
      }
    } else if (playerGuess === guessNumber) {
      output.innerHTML = "You've find the number!";
      gameWon = true;
      endGame();
    }

    //Update the graphic display
    render();
  }

  function endGame() {
    if (gameWon) {
      output.innerHTML =
        "Yes, it's " +
        guessNumber +
        "!" +
        "<br>" +
        "It only took you " +
        guessesMade +
        " guesses.";
    } else {
      output.innerHTML =
        "You lost!<br> No more guesses left!" +
        "<br>" +
        "The number was: " +
        guessNumber +
        ".";
    }

    //Disable button
    button.removeEventListener("click", clickHandler, false);
    button.disabled = true;

    //Disable the Enter key
    window.removeEventListener("keydown", keydownHandler, false);

    //Disable the input
    input.disabled = true;
  }
})();
