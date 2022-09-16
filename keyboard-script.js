//for animated keyboard clicks

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

      testWordString = "";
    
    for(let i = masterGuessList.length - 5; i < masterGuessList.length; i++){
      
      testWordString += masterGuessList[i]; 
      
    }

    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        if(this.status === 404){
          isWord = false; 
        }
      }
    });

    xhr.open("GET", `https://wordsapiv1.p.rapidapi.com/words/${testWordString}`, false);
    xhr.setRequestHeader("X-RapidAPI-Key", "bd5ed6e78emshe67a950d2b6efecp1f1255jsn7ab94a230ac9");
    xhr.setRequestHeader("X-RapidAPI-Host", "wordsapiv1.p.rapidapi.com");

    xhr.send(data);

    if(isWord){
      
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