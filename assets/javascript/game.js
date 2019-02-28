

var wins = 0;
var usedL = [];
var wordsRan;
var words = ["james harden", "boston celtics", "chicago bulls"];
var word = [];
var wordC = [];
var loc = [];
var guesses = 0;
var tempCounter = 0;
var winCounter = 0;
// var guess;

document.getElementById("wins").textContent = wins;

start()



// function that starts the game when pressing a random key
function start(){
    //reset all previous variables
    word = [];
    document.getElementById("mys-word").textContent = word;
    wordC = [];
    loc= [];
    tempCounter = 0;
    usedL = [];
    document.getElementById("usedL").textContent = usedL;
    // randomly chooses a word form the words array
    wordsRan = (Math.floor(Math.random() * words.length));
    
    // creating an array with the correct words to check against user input
    for(h=0;h<words[wordsRan].length;h++){
        wordC.push(words[wordsRan].charAt(h));
    }
    winCondition();
    console.log(winCondition());
    console.log(wordC);
    //loop that creats an array with the same length of the chosen word and replaced letters with "_" and added spaces
    for(i=0;i<words[wordsRan].length;i++){
        if(words[wordsRan].charAt(i) == " "){
            word.push("\xa0\xa0\xa0\xa0\xa0");
        }else{
            word.push("_")
        }
       //console.log(word)
       console.log(words[wordsRan])
    
    }
    document.getElementById("mys-word").textContent = word;

    
        
    
}


document.onkeypress = function() {
    var guess = event.key;
    keyMatch(guess);
        winCondition();
        tempScoreCount();
        console.log(winCheck())
       if(winCheck() == 1){
        wins++;
        document.getElementById("wins").textContent = wins;
        start();
       }else{
       }}














// function that matches the input key to a key on the mystery word
function keyMatch(guess) {
    //checks if key was already guessed
    if (guess == " ") {

     } else if (!(usedL.indexOf(guess)>-1) && (words[wordsRan].indexOf(guess)>-1)) {
        
        usedL.push(guess);
        document.getElementById("usedL").textContent = usedL;
        

        freqMatch(guess);
        //console.log(loc)
        //console.log(guess)
        

        for(i=0; i<loc.length;i++){
            console.log(loc);
            console.log(word);
            word[loc[i]] = words[wordsRan].charAt(loc[i]);
            console.log(word);
        }

     
        document.getElementById("mys-word").textContent = word;
          
    } else if(!(usedL.indexOf(guess)>-1)) {
        usedL.push(guess);
        document.getElementById("usedL").textContent = usedL;
        // add a limit to chances of guessess
        
    } else {
        console.log("used already used key");}
    }





 // function that checks for the frequency and position for each matching key and stores it in an array
 function freqMatch(guess){
     for(var j=0; j<words[wordsRan].length;j++){
         console.log(word)
        if(words[wordsRan].charAt(j) == guess){
             loc.push(j);
        }

   }
    return loc;
}



//function counting the tally of correct letters guessed
function tempScoreCount(){
    tempCounter = 0;
for(k=0;k<word.length;k++){
    if(word[k] == wordC[k]){
        tempCounter++;
    } 
}
return tempCounter;
}



// checks if user correctly guessed all letters
function winCondition(){
  winCounter = 0;
    for(l=0;l<wordC.length;l++){
        if(wordC[l]!=" "){
            winCounter++;
        } else {}
    }
    return winCounter;
}



// compares tempScoreCounter and winCondition to see if user guessed all letters correctly, excluding space key
function winCheck(){
    if(winCondition() === tempScoreCount(word, wordC)){
        return 1;
    }else {
        return 0;
    }
}
