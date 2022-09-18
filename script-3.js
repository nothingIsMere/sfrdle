let currentWord = "score";
let masterLetterArray = []; 
let gameOver = false;
let currentSubmission = "";
let offLimitsCount = 0; 
let submissionCount = 0;
let letterCount = 0;  

const letterboxNodeList = document.querySelectorAll(".letterbox");
let letterboxArray = Array.from(letterboxNodeList);

const acceptableKeys = ["A", "B", "C", "D", "E", "F", "G",
"H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s",
"t","u","v","w","x","y","z","Enter", "Backspace", "ENTER", "BACK"];

window.addEventListener("keydown", (e) => {

  if(!acceptableKeys.includes(e.key)){              //INVALID KEY
    return; 
  }
  else if(e.key === "Backspace"){                   //BACKSPACE
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
  else if(e.key === "Enter"){                         //ENTER
    if(gameOver){
      return;
    }
    
    if(masterLetterArray.length%5 != 0){
      currentSubmission = "";
      for(let i=masterLetterArray.length - masterLetterArray.length%5; i < masterLetterArray.length; i++){
        currentSubmission += masterLetterArray[i];
      }
      console.log(currentSubmission);
    }
    else if(masterLetterArray.length%5 === 0){
      currentSubmission = "";
      for(let i=masterLetterArray.length - 5; i < masterLetterArray.length; i++){
        currentSubmission += masterLetterArray[i];
      }
      console.log(currentSubmission);
    }

    if(currentSubmission.length < 5 || masterLetterArray.length/5 == submissionCount){
      alert("not enough letters");
    }
    else{
      offLimitsCount = masterLetterArray.length;
      submissionCount += 1;
      letterCount = 0;  
    }

    console.log(`offLimitsCount = ${offLimitsCount}`);
    console.log(`currentSubmission = ${currentSubmission}`);
    console.log(`submissionCount = ${submissionCount}`);
  }
  else{                                          //VALID LETTER
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