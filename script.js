let wordList = [
  "SCORE",
  "DRAFT",
  "TRADE",
  "CHEAT",
  "HOOPS",
  "KEVIN",
  "BRIAN",
  "CHAMP",
  "TITLE",
  "POINT",
  "STEAL",
  "BLOCK",
  "BULLS",
  "MAGIC",
  "SQUAD",
  "GREEK",
  "CELTS",
  "KYRIE",
  "BUCKS",
  "KINGS",
  "HAWKS",
  "SPURS",
  "CLASS",
  "SCORE",
  "GAMES",
  "COURT",
  "THREE",
  "SHOTS",
  "SWISH",
  "GUARD",
  "SHOOT",
  ];
let supplementalWordList = [
  "KAWHI",
  "RUBIO",
  "AYTON",
  "TATUM",
  "JOKIC",
];

const currentWord = wordList[Math.floor(Math.random() * (wordList.length))];
let currentWordCopy = currentWord;
let currentWordArray = Array.from(currentWord);
let currentWordCopyArray = Array.from(currentWord); 
let  masterGuessList = [];
const letterboxNodeList = document.querySelectorAll(".letterbox");
let letterboxArray = Array.from(letterboxNodeList);
const keyNodeList = document.querySelectorAll(".key");
const acceptableKeys = ["A", "B", "C", "D", "E", "F", "G",
"H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s",
"t","u","v","w","x","y","z","Enter", "Backspace", "ENTER", "BACK"];
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

const modalWarning = document.getElementById("modal-warning"); 
const modalGameOver = document.getElementById("modal-game-over");
const closeBtn = document.getElementById("close");
const gameOverText = document.getElementById("text-container");

closeBtn.onclick = function() {
  modalGameOver.style.display = "none";
}

for(let i = 0; i < letterboxNodeList.length; i++){
  
  letterboxNodeList[i].id = `letterbox-${i}`;

}

// console.log(supplementalWordList);
// console.log(supplementalWordList.includes("KAWHI"));

//for window keydowns*********************************************************************************************************

window.addEventListener("keydown", (e) => {

  if(!acceptableKeys.includes(e.key)){
    
    return;
  
  }
  
  else if(e.key === "Backspace"){

    isWord = true; 

    if(letterCount > 0){
      letterCount -= 1; 
    }
    

    if(masterGuessList.length === offLimitsCount){
      return; 
    }
    
    masterGuessList.pop();
    letterboxArray[masterGuessList.length].textContent = "";
    letterboxArray[masterGuessList.length].classList.remove("filled-letterbox");

    testWordString = testWordString.slice(0,testWordString.length - 1);

  }
  
  else if(e.key === "Enter"){

    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        if(this.status === 404 && !supplementalWordList.includes(testWordString.toUpperCase())){
          isWord = false; 
        }
      }
    });

    xhr.open("GET", `https://wordsapiv1.p.rapidapi.com/words/${testWordString}`, false);
    xhr.setRequestHeader("X-RapidAPI-Key", "bd5ed6e78emshe67a950d2b6efecp1f1255jsn7ab94a230ac9");
    xhr.setRequestHeader("X-RapidAPI-Host", "wordsapiv1.p.rapidapi.com");

    xhr.send(data);

    if(isWord === true){
      
      if(gameOver === true){
        return;
      }
    
      if(masterGuessList.length%5 === 0 & masterGuessList.length > 0){
        currentWordCopyArray = currentWordArray.slice(0); 
        letterCount = 0;
        offLimitsCount = masterGuessList.length; 
        successCount = 0;
      }
        
      if((masterGuessList.length)%5 !== 0 || masterGuessList.length === 0){
        
        modalWarning.style.display = "flex";
  
        setTimeout(() => {
          modalWarning.style.display = "none";
        }, 1200); 
        return;
      
      }
      else{
        
        testWordArray = [];
        for(let i = masterGuessList.length - 5; i < masterGuessList.length; i++){
          
          testWordArray.push(masterGuessList[i].toUpperCase());
        
        }
        
        for(let i = 0; i < testWordArray.length; i++){
  
          let currentLetterBox = document.getElementById(`letterbox-${i + (((masterGuessList.length)/5) - 1)*5}`);
          let currentKey = document.getElementById(`${testWordArray[i]}`);
  
          if(currentWordCopyArray[i] === testWordArray[i]){
            currentLetterBox.classList.remove("filled-letterbox");
            currentLetterBox.classList.add("success");
            currentWordCopyArray[i] = "*";
            successCount += 1; 
  
            currentKey.classList.remove("near-success");
            currentKey.classList.add("success");
          }
        }
  
        for(let i = 0; i < testWordArray.length; i++){
          
          let currentLetterBox = document.getElementById(`letterbox-${i + (((masterGuessList.length)/5) - 1)*5}`);
          let currentKey = document.getElementById(`${testWordArray[i]}`);
          
          if(!currentLetterBox.classList.contains("success")){
            
            if(currentWordCopyArray.includes(testWordArray[i])){
              
              for(let j = 0; j < testWordArray.length; j++){
                
                if(currentWordCopyArray[j] === testWordArray[i]){
                  currentWordCopyArray[j] = "*";
                }
              
              }
              
              currentLetterBox.classList.remove("filled-letterbox");
              currentLetterBox.classList.add("near-success");
              
              if(!currentKey.classList.contains("success")){
                currentKey.classList.add("near-success");
              }
            
            }
            else{
              
              currentLetterBox.classList.remove("filled-letterbox");
              currentLetterBox.classList.add("fail");
  
              if(!currentKey.classList.contains("success") & !currentKey.classList.contains("near-success")){
                currentKey.classList.add("fail");
              }
            }
          }
  
        }
      
      }
  
      if(masterGuessList.length === 30 & successCount != 5){
        let loserDisplay = document.getElementById("warning-text");
        loserDisplay.textContent = `${currentWord.toUpperCase()}`;
        modalWarning.style.display = "flex";
        setTimeout(() => {
          modalWarning.style.display = "none";
        }, 1200);
      }
    }
    else{
      let invalidWordDisplay = document.getElementById("warning-text");
      invalidWordDisplay.textContent = `Not in word list`;
      modalWarning.style.display = "flex";
      setTimeout(() => {
        modalWarning.style.display = "none";
      }, 1200); 
    }

    testWordString = "";

  }

  else{

    if(letterCount >= 5){
      return; 
    }

    masterGuessList.push(e.key);
    letterboxArray[masterGuessList.length - 1].textContent = e.key.toUpperCase();
    letterboxArray[masterGuessList.length - 1].classList.add("filled-letterbox");
    letterCount += 1;
    testWordString += e.key; 
    
  }

  if(successCount === 5){
    letterCount = 5;
    let guessCount = document.createTextNode(`${masterGuessList.length/5}/6`);
    let guessCountPara = document.createElement("p");
    guessCountPara.appendChild(guessCount);
    gameOverText.innerHTML += "<br>"; 
    gameOverText.appendChild(guessCountPara);
    setTimeout(() => {
      modalGameOver.style.display = "flex";
    }, 1050);
    gameOver = true; 
  }

})

