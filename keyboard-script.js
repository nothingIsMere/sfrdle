//for animated keyboard clicks

// let wordList = [
//   "score",
//   "draft",
//   "trade",
//   "cheat",
//   "hoops",
//   "kevin",
//   "brian",
//   "champ",
//   "title",
//   "point",
//   "steal",
//   "block",
//   "bulls",
//   "magic",
//   "squad",
//   "greek",
//   "celts",
//   "kyrie",
//   "bucks",
//   "kings",
//   "hawks",
//   "spurs",
//   "class",
//   "games",
//   "court",
//   "three",
//   "swish",
//   "guard",
//   "shoot",
//   "coach",
//   "drive",
//   "brick",
//   "pivot",
//   "paint",
//   "press",
//   "strike",
//   "layup",
//   "board",
//   "bench",
//   "bonus",
//   "stats",
//   "curry",

//   ];
// let supplementalWordList = [ //words we want to be valid but which aren't in wordsAPI dictionary, mostly player names
//   "kawhi",
//   "rubio",
//   "ayton",
//   "tatum",
//   "jokic",
//   "herro",
//   "lowry",
//   "zubac",
//   "hield",
//   "bamba",
//   "poole",
//   "kuzma",
//   "franz",
//   "kemba",
//   "lopez",
//   "paolo",
// ];


// const currentWord = wordList[Math.floor(Math.random() * (wordList.length))];
// let currentWordArray = currentWord.split("");
// let currentWordCopy = currentWord;
// let currentWordCopyArray = Array.from(currentWord); 
// let masterLetterArray = []; 
// let gameOver = false;
// let currentSubmission = "";
// let offLimitsCount = 0; 
// let submissionCount = 0;
// let letterCount = 0; 
// let isWord = true; 
// let successCount = 0;

// const modalWarning = document.getElementById("modal-warning"); 
// let warningText = document.getElementById("warning-text");

// const modalGameOver = document.getElementById("modal-game-over");
// const gameOverText = document.getElementById("text-container");

// const closeBtn = document.getElementById("close");
// closeBtn.onclick = function() {
//   modalGameOver.style.display = "none";
// }

// const letterboxNodeList = document.querySelectorAll(".letterbox");
// let letterboxArray = Array.from(letterboxNodeList);
const keyNodeList = document.querySelectorAll(".key");

// const acceptableKeys = ["A", "B", "C", "D", "E", "F", "G",
// "H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
// "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s",
// "t","u","v","w","x","y","z","Enter", "Backspace", "ENTER", "BACK"];

for(let i = 0; i < keyNodeList.length; i++){

  keyNodeList[i].addEventListener("click", (e) => {

    if(!acceptableKeys.includes(e.target.textContent)){                                                   //INVALID KEY
      return; 
    }
    else if(e.target.textContent === "BACK"){ 
      isWord = true;                                                       //BACKSPACE
      if(gameOver){ 
        return;
      }
      if(letterCount > 0){
        letterCount -= 1;
      }
      if(masterLetterArray.length === offLimitsCount){
        return;
      }
      masterLetterArray.pop();
      letterboxArray[masterLetterArray.length].textContent = "";
      letterboxArray[masterLetterArray.length].classList.remove("filled-letterbox");

    }
    else if(e.target.textContent === "ENTER"){                                                             //ENTER
      if(gameOver){
        return;
      }
      
      if(masterLetterArray.length%5 != 0){
        currentSubmission = "";
        for(let i = masterLetterArray.length - masterLetterArray.length%5; i < masterLetterArray.length; i++){
          currentSubmission += masterLetterArray[i];
          currentSubmissionArray = Array.from(currentSubmission);
        }
        //BEGIN API REQUEST
        const data = null;
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === this.DONE) {
            if(this.status === 404 && !supplementalWordList.includes(currentSubmission)){
              isWord = false; 
            }
          }
        });
        xhr.open("GET", `https://wordsapiv1.p.rapidapi.com/words/${currentSubmission}`, false);
        xhr.setRequestHeader("X-RapidAPI-Key", "bd5ed6e78emshe67a950d2b6efecp1f1255jsn7ab94a230ac9");
        xhr.setRequestHeader("X-RapidAPI-Host", "wordsapiv1.p.rapidapi.com");
        xhr.send(data);
        //END API REQUEST
      }
      else if(masterLetterArray.length%5 === 0){
        isWord = true;
        currentSubmission = "";
        for(let i = masterLetterArray.length - 5; i < masterLetterArray.length; i++){
          currentSubmission += masterLetterArray[i].toLowerCase();
          currentSubmissionArray = Array.from(currentSubmission);
        }
        //BEGIN API REQUEST
        const data = null;
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === this.DONE) {
            if(this.status === 404 && !supplementalWordList.includes(currentSubmission)){
              isWord = false; 
            }
          }
        });
        xhr.open("GET", `https://wordsapiv1.p.rapidapi.com/words/${currentSubmission}`, false);
        xhr.setRequestHeader("X-RapidAPI-Key", "bd5ed6e78emshe67a950d2b6efecp1f1255jsn7ab94a230ac9");
        xhr.setRequestHeader("X-RapidAPI-Host", "wordsapiv1.p.rapidapi.com");
        xhr.send(data);
        //END API REQUEST
      }
  
      if(currentSubmission.length < 5 || masterLetterArray.length/5 == submissionCount){   //ENTER>NOT ENOUGH LETTERS
          modalWarning.style.display = "flex";
          warningText.textContent = `Not enough letters`;
          setTimeout(() => {
            modalWarning.style.display = "none";
          }, 1200); 
          return;
      }
      else if(isWord === false){                                                          //ENTER>INVALID WORD
        warningText.textContent = `Not in word list`;
        modalWarning.style.display = "flex";
        setTimeout(() => {
            modalWarning.style.display = "none";
        }, 1200); 
      }
      else{                                                                               //ENTER>VALID WORD                                                                           
        offLimitsCount = masterLetterArray.length;
        submissionCount += 1;
        letterCount = 0;
        
        //BEGIN UPDATE BOXES
        for(let i = 0; i < currentSubmissionArray.length; i++){
          
          let currentLetterBox = document.getElementById(`letterbox-${i + (((masterLetterArray.length)/5) - 1)*5}`);
          let currentKey = document.getElementById(`${currentSubmissionArray[i]}`);
  
          if(currentWordArray[i] === currentSubmissionArray[i]){                                             //UPDATE SUCCESSES
            currentLetterBox.classList.remove("filled-letterbox");
            currentLetterBox.classList.add("success");
            currentWordCopyArray[i] = "*";
  
            if(!currentKey.classList.contains("success")){
              currentKey.classList.remove("near-success");
              currentKey.classList.add("success");
            }
  
            successCount += 1; 
            
          }
        }
  
        for(let i = 0; i < currentSubmissionArray.length; i++){                         //UPDATE NEAR-SUCCESSES AND FAILS
          
          let currentLetterBox = document.getElementById(`letterbox-${i + (((masterLetterArray.length)/5) - 1)*5}`);
          let currentKey = document.getElementById(`${currentSubmissionArray[i]}`);
  
          if(!currentLetterBox.classList.contains("success")){
            if(currentWordCopyArray.includes(currentSubmissionArray[i])){
              currentLetterBox.classList.remove("filled-letterbox");
              currentLetterBox.classList.add("near-success");
              if(!currentKey.classList.contains("success") && !currentKey.classList.contains("near-success")){
                currentKey.classList.add("near-success");
              }
  
              for(let j = 0; j < currentSubmissionArray.length; j++){
                if(currentWordCopyArray[j] === currentSubmissionArray[i]){
                  currentWordCopyArray[j] = "*";
                }
              }
               
            }
            else{
              currentLetterBox.classList.remove("filled-letterbox");
              currentLetterBox.classList.add("fail");
              if(!currentKey.classList.contains("success") && !currentKey.classList.contains("near-success")){
                currentKey.classList.add("fail");
              }
            }
          }
        }
      }  
        
      currentWordCopyArray = Array.from(currentWord);
  
      if(masterLetterArray.length === 30 & successCount != 5 && isWord === true){
        let loserDisplay = document.getElementById("warning-text");
        warningText.textContent = `${currentWord.toUpperCase()}`;
        modalWarning.style.display = "flex";
        setTimeout(() => {
          modalWarning.style.display = "none";
        }, 1200);
      }
  
      if(successCount === 5){
        letterCount = 5;
        let guessCount = document.createTextNode(`${masterLetterArray.length/5}/6`);
        let guessCountPara = document.createElement("p");
        guessCountPara.appendChild(guessCount);
        gameOverText.innerHTML += "<br>"; 
        gameOverText.appendChild(guessCountPara);
        setTimeout(() => {
          modalGameOver.style.display = "flex";
        }, 1050);
        gameOver = true; 
      }
  
      successCount = 0; 
    }
    else{                                                                                    //VALID LETTER
      if(gameOver){
        return;
      }
  
      if(letterCount === 5){
        return;
      }
      else{
        masterLetterArray.push(e.target.textContent);
        letterboxArray[masterLetterArray.length - 1].textContent = e.target.textContent.toUpperCase();
        letterboxArray[masterLetterArray.length - 1].classList.add("filled-letterbox");
  
        letterCount += 1;
  
      }
  
    }
  
  })
}