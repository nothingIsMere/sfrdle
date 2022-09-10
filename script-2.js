let currentWord = "ABBEY";
let currentWordCopy = "ABBEY"
let wordList = [
  "SCORE",
  "DRAFT",
  "TRADE",
  "CHEAT",
  "HOOPS",
  "KAWHI",
  "KEVIN",
  "BRIAN",
  "CHAMP",
  "TITLE",
  "POINT",
  "STEAL",
  "BLOCK",
  "JOKIC",
  "BULLS",
  "MAGIC",
  "SQUAD",
  "GREEK"
  ];
let currentWordArray = Array.from(currentWord);
let currentWordCopyArray = Array.from(currentWord); 
let  masterGuessList = [];
const letterboxNodeList = document.querySelectorAll(".letterbox");
let letterboxArray = Array.from(letterboxNodeList);
const keyNodeList = document.querySelectorAll(".key");
const acceptableKeys = ["A", "B", "C", "D", "E", "F", "G",
"H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s",
"t","u","v","w","x","y","z","Enter", "Backspace",];
let testWordArray = [];
let successLetters = [];
let nearSuccessLetters = [];
let failLetters = [];
let offLimitsCount = 0;
let letterCount = 0;
let successCount = 0;
const modalWarning = document.getElementById("modal-warning"); 
const modalGameOver = document.getElementById("modal-game-over");
const closeBtn = document.getElementById("close");

closeBtn.onclick = function() {
  modalGameOver.style.display = "none";
}

for(let i = 0; i < letterboxNodeList.length; i++){
  
  letterboxNodeList[i].id = `letterbox-${i}`;

}

//for window keydowns

window.addEventListener("keydown", (e) => {

  if(!acceptableKeys.includes(e.key)){
    
    return;
  
  }
  
  else if(e.key === "Backspace"){

    if(letterCount > 0){
      letterCount -= 1; 
    }
    

    if(masterGuessList.length === offLimitsCount){
      return; 
    }
    
    masterGuessList.pop();
    letterboxArray[masterGuessList.length].textContent = "";
    letterboxArray[masterGuessList.length].style.border = "2px solid rgb(192, 189, 189)";
  
  }
  
  else if(e.key === "Enter"){
  
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
      }, 1050); 
      return;
    
    }
    else{
      
      testWordArray = [];
      for(let i = masterGuessList.length - 5; i < masterGuessList.length; i++){
        
        testWordArray.push(masterGuessList[i].toUpperCase());
      
      }
      
      for(let i = 0; i < testWordArray.length; i++){

        let currentLetterBox = document.getElementById(`letterbox-${i + (((masterGuessList.length)/5) - 1)*5}`);

        if(currentWordCopyArray[i] === testWordArray[i]){
          currentLetterBox.classList.add("success");
          currentLetterBox.classList.remove("filled-letterbox");
          currentWordCopyArray[i] = "*";
          successCount += 1; 
        }
      }

      for(let i = 0; i < testWordArray.length; i++){
        
        let currentLetterBox = document.getElementById(`letterbox-${i + (((masterGuessList.length)/5) - 1)*5}`);
        
        if(!currentLetterBox.classList.contains("success")){
          if(currentWordCopyArray.includes(testWordArray[i])){
            for(let j = 0; j < testWordArray.length; j++){
              if(currentWordCopyArray[j] === testWordArray[i]){
                currentWordCopyArray[j] = "*";
              }
            }
            currentLetterBox.classList.add("near-success");
            currentLetterBox.classList.remove("filled-letterbox");
          
          }
          else{
            
            currentLetterBox.classList.add("fail");
            currentLetterBox.classList.remove("filled-letterbox");
          
          }
        }

      }


    

      //update keys
      

      
    }

    if(masterGuessList.length === 30){
      const loseText = document.getElementById("game-over-text");
      loseText.textContent = "You lose"; 
      setTimeout(() => {
        modalGameOver.style.display = "flex";
      }, 500);
    }
  }
  else{

    if(letterCount >= 5){
      return; 
    }

    masterGuessList.push(e.key);
    letterboxArray[masterGuessList.length - 1].textContent = e.key.toUpperCase();
    letterboxArray[masterGuessList.length - 1].classList.add("filled-letterbox");
    letterCount += 1;
    
  }

  if(successCount === 5){
    letterCount = 5;
    setTimeout(() => {
      modalGameOver.style.display = "flex";
    }, 1050);
  }

})
