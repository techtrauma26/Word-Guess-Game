var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var breeds = ["affenpinscher", "akita", "basenji", "beagle", "beauceron", "bloodhound", "borzoi", "boxer", "briard", "brittany", "bulldog", "bullmastiff", "chihuahua", "collie", "dachshund", "dalmatian", "greyhound", "havanese", "leonberger", "maltese", "mastiff", "newfoundland", "poodle", "pug", "retriever", "rottweiler", "saluki", "samoyed", "schipperke", "setter", "sloughi", "spaniel", "vizsla", "weimaraner", "whippet", "xoloitzcuintil"];

var gameStarted = false;
var currentWord;
var wordAsDashes;
var guessesLeft;
var lettersGuessed;
var numWins = 0;
var numLosses = 0;
var getNewWord;
var wordPlace; //place in breeds array
var correctGuesses;
var wordAsArr = [];
var dashesArray = [];

function initialize() {
	gameStarted = true;
	lettersGuessed = [];
	correctGuesses = 0;
	wordPlace = Math.floor(Math.random() * 36);
	currentWord = breeds[wordPlace];			//string
	guessesLeft = 17 - currentWord.length;		//longer words get less guesses   // or have a constant number
	wordAsDashes = makeIntoDashes(currentWord);	//string of dashes
	wordAsArr = currentWord.split('');			//array with letters
	dashesArray = wordAsDashes.split('');		//array with dashes
	document.getElementById("currentWord").innerHTML = wordAsDashes;
	document.getElementById("lettersGuessed").innerHTML = "--";
	document.getElementById("guessesLeft").innerHTML = guessesLeft;
}

// Make each word into underscores //

function makeIntoDashes(word) {
	var dashes = "";
	for (i = 0; i < word.length - 1; i++) {
		dashes += "_ ";
	}
	dashes += "_";
	return dashes;
}

// Main function that controls what to do with each keystroke //

function playGame(letter) {
	var letter = letter.toLowerCase();

// Checks if key is a letter //

	if (alphabet.indexOf(letter) > -1) {
		if (wordAsArr.indexOf(letter) > -1) {
			correctGuesses++;
			displayLetter(letter);
		}
		else {
			if (lettersGuessed.indexOf(letter) > -1) {
				return;
			}
			else {
				guessesLeft--;
				document.getElementById("guessesLeft").innerHTML = guessesLeft;
				lettersGuessed.push(letter);
				document.getElementById("lettersGuessed").innerHTML = lettersGuessed.join(' ');
				if (guessesLeft == 0) {
					alert("Sorry! The correct answer is " + currentWord);
					initialize();
					numLosses++;
					document.getElementById("losses").innerHTML = numLosses;
				}
			}
		}
	}
}

// Displays letter if it's in word //

function displayLetter(letter) {

// For each char in wordAsDashes, if matches currentWord --> display //

	for (i = 0; i < currentWord.length; i++) {
		if (letter == wordAsArr[i]) {
			dashesArray[i * 2] = letter;
			console.log(dashesArray);
		}
	}
	document.getElementById("currentWord").innerHTML = dashesArray.join("");
	checkForWin();
}

// Checks for win by looking for "_" //

function checkForWin() {
	if (dashesArray.indexOf("_") === -1) {
		alert("You got it! The correct answer is " + currentWord);
		numWins++;
		document.getElementById("wins").innerHTML = numWins;
		initialize();
	}
}

document.onkeyup = function (event) {
	if (!gameStarted) {
		document.getElementById("letsPlay").innerHTML = "";
		initialize();
		document.getElementById("currentWord").innerHTML = wordAsDashes.split(",");
		console.log(currentWord);
		gameStarted = true;
	}
	else {
		playGame(event.key);
	}
}