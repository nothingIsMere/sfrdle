let currentWord = "abbey";
let currentWordArray = currentWord.split("");
let currentWordCopy = currentWord;
let currentWordCopyArray = Array.from(currentWord); 
let masterLetterArray = []; 
let gameOver = false;
let currentSubmission = "";
let offLimitsCount = 0; 
let submissionCount = 0;
let letterCount = 0; 
let isWord = true; 

const letterboxNodeList = document.querySelectorAll(".letterbox");
let letterboxArray = Array.from(letterboxNodeList);

const acceptableKeys = ["A", "B", "C", "D", "E", "F", "G",
"H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s",
"t","u","v","w","x","y","z","Enter", "Backspace", "ENTER", "BACK"];
let supplementalWordList = [];

window.addEventListener("keydown", (e) => {

  if(!acceptableKeys.includes(e.key)){                                                   //INVALID KEY
    return; 
  }
  else if(e.key === "Backspace"){ 
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
    console.log(`masterLetterArray.length = ${masterLetterArray.length}`);
  }
  else if(e.key === "Enter"){                                                             //ENTER
    if(gameOver){
      return;
    }
    
    if(masterLetterArray.length%5 != 0){
      currentSubmission = "";
      for(let i=masterLetterArray.length - masterLetterArray.length%5; i < masterLetterArray.length; i++){
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
      console.log(currentSubmission);
      console.log(currentSubmissionArray);
    }
    else if(masterLetterArray.length%5 === 0){
      currentSubmission = "";
      for(let i=masterLetterArray.length - 5; i < masterLetterArray.length; i++){
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
      console.log(currentSubmission);
      console.log(currentSubmissionArray);
    }

    if(currentSubmission.length < 5 || masterLetterArray.length/5 == submissionCount){   //ENTER>NOT ENOUGH LETTERS
      alert("Not enough letters");
    }
    else if(isWord === false){                                                          //ENTER>INVALID WORD
      alert("Not in word list");
    }
    else{
      offLimitsCount = masterLetterArray.length;
      submissionCount += 1;
      letterCount = 0;
      
      //BEGIN UPDATE BOXES
      for(let i = 0; i < currentSubmissionArray.length; i++){                         //UPDATE SUCCESSES
        
        let currentLetterBox = document.getElementById(`letterbox-${i + (((masterLetterArray.length)/5) - 1)*5}`);
        let currentKey = document.getElementById(`${currentSubmissionArray[i]}`);

        if(currentWordArray[i] === currentSubmissionArray[i]){
          currentLetterBox.classList.remove("filled-letterbox");
          currentLetterBox.classList.add("success");
          currentWordCopyArray[i] = "*";

          if(!currentKey.classList.contains("success")){
            currentKey.classList.remove("near-success");
            currentKey.classList.add("success");
          }
          
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
            currentLetterBox.classList.add("fail");
            if(!currentKey.classList.contains("success")){
              currentKey.classList.add("fail");
            }
          }
        }
      }

    }  
      
    currentWordCopyArray = Array.from(currentWord);
      
    console.log(`offLimitsCount = ${offLimitsCount}`);
    console.log(`currentSubmission = ${currentSubmission}`);
    console.log(`submissionCount = ${submissionCount}`);
  }
  else{                                                                                    //VALID LETTER
    if(gameOver){
      return;
    }

    if(letterCount === 5){
      return;
    }
    else{
      masterLetterArray.push(e.key);
      letterboxArray[masterLetterArray.length - 1].textContent = e.key.toUpperCase();
      letterboxArray[masterLetterArray.length - 1].classList.add("filled-letterbox");

      letterCount += 1;

      console.log(`masterLetterArray.length = ${masterLetterArray.length}`);

    }

  }

})