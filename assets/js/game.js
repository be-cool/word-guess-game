'use strict';

var words = [
    "HARPER",
    // "GIROUX",
    // "WENTZ",
    "EAGLES",
    "FLYERS",
    // "UNION",
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

// need to get the letters onto the page in their placeholding p tags
    document.getElementById("current-word").innerText = currentWordText;
    document.getElementById("guesses-remaining").innerText = guessesRemaining;
    document.getElementById("already-guessed").innerText = currentLetters;

};


function checkguess(letter) {
    var position = [];
    for (var i = 0; i < words[wordIndex].length; i++) {
        if(words[wordIndex][i] === letter) {
            position.push(i);
        }
    }
    if (position.length <= 0) {
        guessesRemaining--;
    } 
    else {
        for(var i = 0; i < position.length; i++) {
            currentWord[position[i]] = letter;
        }
    }
};

// make a function to see if you win or lose
function win() {
    if(currentWord.indexOf("-") === -1) {
        wins++;
        gameOver = true;
        alert("You won! You must be a Philly fan!!")

    }
};

function lose()
{
    if(guessesRemaining <= 0) {
        gameOver = true;
    }
}


function guess(letter) {
    if (guessesRemaining > 0) {
        if (currentLetters.indexOf(letter) === -1) {
            currentLetters.push(letter);
            checkguess(letter);
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
            win();
            lose();
        }
    }
};
