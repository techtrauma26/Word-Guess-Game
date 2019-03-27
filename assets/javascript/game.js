

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var countries = ["Afghanistan", "Albania", "Algeria", "Argentina", "Armenia", "Bahamas", "Bangladesh", "Belgium", "Brazil", "Cambodia", "Canada", "Denmark", "Ecuador", "Egypt", "Finland", "France", "Germany", "Hungary", "India", "Iran", "Japan", "Kenya",
"Laos", "Madagascar", "Portugal", "Serbia", "Turkey", "Ukraine", "Venezuela", "Vietnam"];
var chosenCountry = "";
var lostCount = 0;
var winCount = 0;
var avaliableGuess = 0;
var remainingLetters = 0;
var dashesArray = [];
var userLettersArray = [];

function initialize() {
	chosenCountry = countries[Math.floor(Math.random() * countries.length)];
	console.log(chosenCountry);
	avaliableGuess = 19;
	remainingLetters = chosenCountry.length;
	document.getElementById("selectedCountry").innerHTML = makeDashes(chosenCountry);
	document.getElementById("guessAvaliable").innerHTML = avaliableGuess
	document.getElementById("wins").innerHTML = winCount;
	document.getElementById("losses").innerHTML = lostCount;
}

function makeDashes(chosenCountry) {
	var dashes = "";
	for (i = 0; i < chosenCountry.length - 1; i++) {
		dashes += " _ ";
	}

	for (i = 0; i < chosenCountry.length; i++) {
		dashesArray[i] = "_";
	}
	dashes += " _ ";
	return dashes;
}
function caputureKeyStroke(letter) {

	if (alphabet.indexOf(letter.toLowerCase()) > -1) {
		userLettersArray.push(letter);
		for (var j = 0; j < chosenCountry.length; j++) {
			if (chosenCountry[j].toLowerCase() === letter.toLowerCase() && dashesArray[j] === "_") {
				dashesArray[j] = letter;
				remainingLetters--;
			}
		}
		avaliableGuess--;
		document.getElementById("guessAvaliable").innerHTML = avaliableGuess
		document.getElementById("selectedCountry").innerHTML = dashesArray;
		document.getElementById("userCharacters").innerHTML = userLettersArray.join(" ");
	}
	if (avaliableGuess > 0 && remainingLetters === 0) {
		winCount++;
		document.getElementById("wins").innerHTML = winCount;
		alert ("You won!!" );
		playAgain ();
	}
	else if (avaliableGuess === 0 && remainingLetters > 0) {
		lostCount++;
		document.getElementById("losses").innerHTML = lostCount;
		alert ("You lost! The correct answer is " + chosenCountry);
	playAgain ();
	}
}
playAgain = function () {
	initialize();
	// document.getElementById("answer").innerHTML = "";
document.getElementById("userCharacters").innerHTML = "";
userLettersArray= [];
};

window.onload = function () {
	initialize();
};

document.onkeyup = function (event) {
	caputureKeyStroke(event.key);


};