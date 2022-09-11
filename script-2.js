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
"t","u","v","w","x","y","z","Enter", "Backspace", "ENTER", "BACK"];
let testWordArray = [];
let successLetters = [];
let nearSuccessLetters = [];
let failLetters = [];
let offLimitsCount = 0;
let letterCount = 0;
let successCount = 0;
let gameOver;
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

//for window keydowns*********************************************************************************************************

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
    letterboxArray[masterGuessList.length].classList.remove("filled-letterbox");
  
  }
  
  else if(e.key === "Enter"){

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
      const loseText = document.getElementById("game-over-text");
      loseText.textContent = "You lose!"; 
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

//for animated keyboard clicks*********************************************************************************************************

for(let i = 0; i < keyNodeList.length; i++){

  keyNodeList[i].addEventListener("click", (e) => {

    if(!acceptableKeys.includes(e.target.textContent)){
    
      return;
    
    }
    
    else if(e.target.textContent === "BACK"){
  
      if(letterCount > 0){
        letterCount -= 1; 
      }
      
  
      if(masterGuessList.length === offLimitsCount){
        return; 
      }
      
      masterGuessList.pop();
      letterboxArray[masterGuessList.length].textContent = "";
      letterboxArray[masterGuessList.length].classList.remove("filled-letterbox");
    
    }
    
    else if(e.target.textContent === "ENTER"){
  
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
        const loseText = document.getElementById("game-over-text");
        loseText.textContent = "You lose!"; 
        setTimeout(() => {
          modalGameOver.style.display = "flex";
        }, 500);
      }
    }
    else{
  
      if(letterCount >= 5){
        return; 
      }
  
      masterGuessList.push(e.target.textContent);
      letterboxArray[masterGuessList.length - 1].textContent = e.target.textContent.toUpperCase();
      letterboxArray[masterGuessList.length - 1].classList.add("filled-letterbox");
      letterCount += 1;
      
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

    
}