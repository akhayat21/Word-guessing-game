// declaring all variables to make sure theyre all global variables
var wins = 0;
var usedL = [];
var wordsRan;
var words = ["james harden", "boston celtics", "chicago bulls","la lakers","golden state warriors","toronto raptors", "houston rockets", "oklahoma city thunder", "san antonio spurs", "milwaukee bucks", "new york knicks",
"cleaveland cavaliers", "sacramento kings", "miami heat", "dallas mavericks", "denver nuggets", "utah jazz", "los angeles clippers", "new orlean pelicans", "portland trailblazers", "brooklyn nets","detriot pistons","minnesota timberwolves", 
"indiana pacers", "phoenix suns", " charlotte hornets", "orlando magic", "memphis grizzlies", "atlanta hawks", "washington wizards", "lebron james", "michael jordon", "steph curry", "kevin durant", "kyrie irving","hakeem olajuwon", "shaquille o neal", "kobe byrant","magic johnson"];
var word = [];
word.join(" ");
var wordC = [];
var loc = [];
var guesses = 10;
var tempCounter = 0;
var winCounter = 0;
var AlphaB = [];


window.onload = function() {
    bgRan();
  };

document.getElementById("start").textContent = "Press any key to get started";

// starts the main function when any button is pressed
document.onkeypress = function start() { 
    begin() 

}



//main function combines all secondary functions to get the program to run as expected
function main() {
    var guess = event.key;
    guess = guess.toLowerCase();
    //console.log(guess);
    if (AlphaB.indexOf(guess) > -1) {
        keyMatch(guess);
        winCondition();
        tempScoreCount();
        //console.log(winCheck())
        if (winCheck() == 1) {
            wins++;
            document.getElementById("wins").textContent = wins;
            audio();
            document.getElementById("start").textContent = "Congratulations, press any key to get start again";
            document.onkeypress = function(){ begin() }
        } else {
        }
    } else { }
}



// setup function that starts the game when pressing a random key
function begin() {
    //resets the press any key to start header
    document.getElementById("start").textContent = "Guess the right word!";
    //generates array for alphabet
    alphaB();
    //reset all previous variables
    wordC = [];
    loc = [];
    tempCounter = 0;
    word = [];
    document.getElementById("mys-word").textContent = word;
    usedL = [];
    document.getElementById("usedL").textContent = usedL;
    guesses = 10;
    document.getElementById("guesses").textContent = guesses;
    document.getElementById("wins").textContent = wins;


    // randomly chooses a word form the words array
    wordsRan = (Math.floor(Math.random() * words.length));

    // creating an array with the correct words to check against user input
    for (h = 0; h < words[wordsRan].length; h++) {
        wordC.push(words[wordsRan].charAt(h));
    }
    //function that generates a win condition(explained better at function)
    winCondition();


    //testing logs
    //console.log(winCondition());
    //console.log(wordC);


    //loop that creats an array with the same length of the chosen word and replaced letters with "_" and added spaces
    for (i = 0; i < words[wordsRan].length; i++) {
        if (words[wordsRan].charAt(i) == " ") {
            word.push("\xa0\xa0\xa0\xa0\xa0");
        } else {
            word.push("_")
        }

        // more testing logs
        //console.log(word)
        //console.log(words[wordsRan])

    }
    
    document.getElementById("mys-word").textContent = word;


    //runs the main function when a button is pressed
    document.onkeypress = function () { main() };


}






// function that checks if the pressed key matches one of the letters in the computer chosen word
// also uses logic to dictate whether a key has already been pressed and if the user
// is running out of guesses
function keyMatch(guess) {
    //checks if key guessed was a spacebar and does nothing if it was *is unessicary because implimented logic on line 31*
    if (guess == " ") {


        //checks if input is on an array of already pressed keys, and if it is part of the computer chosen word
    } else if (!(usedL.indexOf(guess) > -1) && (words[wordsRan].indexOf(guess) > -1)) {
        //adds it to the used letter array and refreshes guessed letter array on html
        usedL.push(guess);
        document.getElementById("usedL").textContent = usedL;

        //runs function that counts where and how many times the letter guessed appears in the word
        freqMatch(guess);
        //console.log(loc)
        //console.log(guess)

        //a loop that uses the info gathered in freqMatch(guess); function to fill in the blanks on the html by
        //replacing the location of the guessed letter with the guessed letter
        for (i = 0; i < loc.length; i++) {
            console.log(loc);
            console.log(word);
            word[loc[i]] = words[wordsRan].charAt(loc[i]);
            console.log(word);
        }

        // refresh html missing letters with correctly guessed letters
        document.getElementById("mys-word").textContent = word;


        // condition to determine if letter guessed is not on the already guessed letters array, and is not a letter 
        // in the computer chosen word AND the user has more than one guess to be able to continue guessing AFTER
        // they lose a chance to guess
    } else if (!(usedL.indexOf(guess) > -1) && !(words[wordsRan].indexOf(guess) > -1) && (guesses > 1)) {
        // subtract 1 from guesses remaining, refresh that. adds guess to guessed letter array and refreshes that
        guesses--;
        document.getElementById("guesses").textContent = guesses;
        usedL.push(guess);
        document.getElementById("usedL").textContent = usedL;


        // conditon to see if letter was not guessed already, and is not a correct guess, and the user only has 1 guess remaing
        // to restart the game because user just lost
    } else if (!(usedL.indexOf(guess) > -1) && !(words[wordsRan].indexOf(guess) > -1) && (guesses = 1)) {
        guesses--;
        document.getElementById("guesses").textContent = guesses;
        usedL.push(guess);
        document.getElementById("usedL").textContent = usedL;
        document.getElementById("mys-word").textContent = wordC;
        document.getElementById("start").textContent = "Better luck next time, press any key to get started"
        document.onkeypress = function(){ begin() };
    }
    // all other conditions left are if the user guessed the letter already
    else {
        //console.log("already guessed");}
    }
}





// function that checks for the frequency and position for each matching key and stores it in an array using loop
function freqMatch(guess) {
    for (var j = 0; j < words[wordsRan].length; j++) {
        console.log(word)
        if (words[wordsRan].charAt(j) == guess) {
            loc.push(j);
        }

    }
    return loc;
}



//function counting the tally of correct letters guessed
// is a score count to identify if user correctly guessed all letters when compared to maximum possible points
// 1 point for every correctly scored letter, including repeats and expluding spaces
function tempScoreCount() {
    tempCounter = 0;
    for (k = 0; k < word.length; k++) {
        if (word[k] == wordC[k]) {
            tempCounter++;
        }
    }
    return tempCounter;
}



// function that generates a value for maximum possible points to compare to tempScoreCount
function winCondition() {
    winCounter = 0;
    for (l = 0; l < wordC.length; l++) {
        if (wordC[l] != " ") {
            winCounter++;
        } else { }
    }
    return winCounter;
}



// compares tempScoreCounter and winCondition to see if user guessed all letters correctly, excluding space key
function winCheck() {
    if (winCondition() === tempScoreCount(word, wordC)) {
        return 1;
    } else {
        return 0;
    }
}

// function to generate an array with the alphabet in it(a-z)
function alphaB() {
    for (m = 0; m < 26; m++) {
        AlphaB.push(String.fromCharCode(97 + m));
    }
    console.log(AlphaB);
}


//function to randomly choose the background image
function bgRan(){
    var image = ["nba_1","nba_2","nba_3","nba_4","nba_5"];
    var ran = (Math.floor(Math.random() * image.length));;
    //console.log(ran);
    $("body").css("background-image", "url('./assets/images/"+image[ran]+".jpg')");
    $("body").css("background-size", "cover;");
    $("body").css("background-position","center");
    

}   


//function to play audio on win
function audio(){
    console.log("test"); 
    var audio = new Audio('./assets/sound/buzzer_beater.mp3');
    audio.play();
}