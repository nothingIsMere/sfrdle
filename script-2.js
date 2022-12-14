let currentWord = "score";
let wordList = [
    "score",
    "draft",
    "trade",
    "cheat",
    "hoops",
    "kevin",
    "brian",
    "champ",
    "title",
    "point",
    "steal",
    "block",
    "bulls",
    "magic",
    "squad",
    "greek",
    "celts",
    "kyrie",
    "bucks",
    "kings",
    "hawks",
    "spurs",
    "class",
    "games",
    "court",
    "three",
    "shots",
    "swish",
    "guard",
    "shoot",
    ];
let supplementalWordList = [ //words we want to be valid but which aren't in wordsAPI dictionary, mostly player names
    "kawhi",
    "rubio",
    "ayton",
    "tatum",
    "jokic",
  ];

const acceptableKeys = ["A", "B", "C", "D", "E", "F", "G",
"H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s",
"t","u","v","w","x","y","z","Enter", "Backspace", "ENTER", "BACK"];

// const currentWord = wordList[Math.floor(Math.random() * (wordList.length))];
let currentWordCopy = currentWord;
let currentWordArray = Array.from(currentWord);
let currentWordCopyArray = Array.from(currentWord); 
let  masterGuessList = [];
const letterboxNodeList = document.querySelectorAll(".letterbox");
let letterboxArray = Array.from(letterboxNodeList);
const keyNodeList = document.querySelectorAll(".key");

let testWordArray = [];
let successLetters = [];
let nearSuccessLetters = [];
let failLetters = [];
let offLimitsCount = 0;
let letterCount = 0;
let successCount = 0;
let gameOver;
let testWordString = ""; 
let isWord = true;
let guessCount = 0; 

const modalWarning = document.getElementById("modal-warning"); 
const modalGameOver = document.getElementById("modal-game-over");
const closeBtn = document.getElementById("close");
const gameOverText = document.getElementById("text-container");
let warningText = document.getElementById("warning-text");

closeBtn.onclick = function() {
  modalGameOver.style.display = "none";
}

for(let i = 0; i < letterboxNodeList.length; i++){ //assigning ids to letterboxes
  
  letterboxNodeList[i].id = `letterbox-${i}`;

}

window.addEventListener("keydown", (e) => {

    if(!acceptableKeys.includes(e.key)){    //INVALID KEY 
        return;
    }
    else if(e.key === "Enter"){            //ENTER

        //start API request for word validation
        const data = null;

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                if(this.status === 404 && !supplementalWordList.includes(testWordString)){
                isWord = false; 
                }
            }
        });

        xhr.open("GET", `https://wordsapiv1.p.rapidapi.com/words/${testWordString.toLowerCase()}`, false);
        xhr.setRequestHeader("X-RapidAPI-Key", "bd5ed6e78emshe67a950d2b6efecp1f1255jsn7ab94a230ac9");
        xhr.setRequestHeader("X-RapidAPI-Host", "wordsapiv1.p.rapidapi.com");

        xhr.send(data);
        //end API request   
            
        //If user hasn't entered enough letters yet
        if(masterGuessList.length%5 != 0 || parseInt(masterGuessList.length/5) === guessCount){
            warningText.textContent = `Not enough letters`;
            modalWarning.style.display = "flex";
            setTimeout(() => {
            modalWarning.style.display = "none";
            }, 1200); 
            return;
        }
        //if user enters an invalid word 
        else if(isWord === false){
            warningText.textContent = `Not in word list`;
            modalWarning.style.display = "flex";
            setTimeout(() => {
                modalWarning.style.display = "none";
            }, 1200); 
        }
        //if user enters a valid word
        else{

            if(gameOver === true){     
                return;
            }
            else if(masterGuessList.length === 30 & successCount != 5){
                warningText.textContent = `${currentWord.toUpperCase()}`;
                modalWarning.style.display = "flex";
                setTimeout(() => {
                    modalWarning.style.display = "none";
                }, 1200);
            }
            else if(successCount === 5){
                letterCount = 5;
                let guessCountText = document.createTextNode(`${masterGuessList.length/5}/6`);
                let guessCountPara = document.createElement("p");
                guessCountPara.appendChild(guessCountText);
                gameOverText.innerHTML += "<br>"; 
                gameOverText.appendChild(guessCountPara);
                setTimeout(() => {
                  modalGameOver.style.display = "flex";
                }, 1050);
                gameOver = true;
            } 
            else{                                                    //UPDATE BOXES AND KEYS 
                currentWordCopyArray = currentWordArray.slice(0); 
                letterCount = 0;
                offLimitsCount = masterGuessList.length; 
                successCount = 0;
                guessCount = masterGuessList.length/5;
                console.log(`guessCount = ${guessCount}`);
                console.log(parseInt(masterGuessList.length/5));
                
                for(let i = masterGuessList.length - 5; i < masterGuessList.length; i++){
                    testWordArray.push(masterGuessList[i]);
                } 
            }

            testWordString = "";

            
        }

    }
    else if(e.key === "Backspace"){                    //BACKSPACE

        isWord = true;

        if(masterGuessList.length === offLimitsCount){
            return; 
            }
        
        testWordString = testWordString.slice(0,testWordString.length - 1);
        if(letterCount > 0){
            letterCount -= 1;
        }
        
        masterGuessList.pop();
        letterboxArray[masterGuessList.length].textContent = "";
        letterboxArray[masterGuessList.length].classList.remove("filled-letterbox");
    }
    else{                                         //VALID LETTER

        if(letterCount >= 5){
            return;
        }
        
        testWordString += e.key;         
        letterCount += 1;

        masterGuessList.push(e.key);
        letterboxArray[masterGuessList.length - 1].textContent = e.key.toUpperCase();
        letterboxArray[masterGuessList.length - 1].classList.add("filled-letterbox");
    }

})