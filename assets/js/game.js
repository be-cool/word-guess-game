'use strict';

var words = [
    "HARPER",
    "GIROUX",
    "WENTZ",
    "EAGLES",
    "FLYERS",
    "UNION",
    "SIXERS",
    "PHILLIES",
    "EMBIID",
    "GRITTY"
]
// define all variables needed
const totalGuesses = 8;
var currentLetters = [];
var currentWord = [];
var wordIndex;
var guessesRemaining = 0;
var wins = 0;
var gameOver = false;
// create a function to display the what happens when you play onto the page

// define how to reset the game with a function if it is won or lost or just to get it started
function reset() {
    guessesRemaining = totalGuesses;
    wordIndex = Math.floor(Math.random() * (words.length));
    currentLetters = [];
    currentWord = [];

    for (var i = 0; i < words[wordIndex].length; i++) {
        currentWord.push("-");
    }

    updateDisplay();
}

function updateDisplay() {
    document.getElementById("wins").innerText = wins;
    var currentWordText = "";
    for (var i = 0; i < currentWord.length; i++) {
        currentWordText += currentWord[i];
    }

// add the letters onto the page in the placeholder p-id tag.
    document.getElementById("current-word").innerText = currentWordText;
    document.getElementById("guesses-remaining").innerText = guessesRemaining;
    document.getElementById("already-guessed").innerText = currentLetters;

};


function checkGuess(letter) {
    var position = [];

    // have to see if it is found multiple times in same word
    for (var i = 0; i < words[wordIndex].length; i++) {
        if(words[wordIndex][i] === letter) {
            position.push(i);
        }
    }

    // if there are no indicies, remove a guess and update the hangman image
    if (position.length <= 0) {
        guessesRemaining--;
    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for(var i = 0; i < position.length; i++) {
            currentWord[position[i]] = letter;
        }
    }
};

// Checks for a win by seeing if there are any remaining underscores in the guessingword we are building.
function checkWin() {
    if(currentWord.indexOf("-") === -1) {
        wins++;
        gameOver = true;
    }
};


// Checks for a loss
function checkLoss()
{
    if(guessesRemaining <= 0) {
        gameOver = true;
    }
}

// Makes a guess
function guess(letter) {
    if (guessesRemaining > 0) {
        // Make sure we didn't use this letter yet
        if (currentLetters.indexOf(letter) === -1) {
            currentLetters.push(letter);
            checkGuess(letter);
        }
    }
    
};

document.onkeydown = function(event) {
    if(gameOver) {
        reset();
        gameOver = false;
    }
    else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            guess(event.key.toUpperCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
};
