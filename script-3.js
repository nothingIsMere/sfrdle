currentWord = "score"; 
let gameOver = false;
let masterLetterList = [];
const acceptableKeys = ["A", "B", "C", "D", "E", "F", "G",
"H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s",
"t","u","v","w","x","y","z","Enter", "Backspace", "ENTER", "BACK"];
let currentSubmission = "";
let officialSubmissionCount = 0;   

const letterboxNodeList = document.querySelectorAll(".letterbox");
let letterboxArray = Array.from(letterboxNodeList);

window.addEventListener("keydown", (e) => {

  if(!acceptableKeys.includes(e.key)){    //INVALID KEY 
    return;
  }
  else if(e.key === "Backspace"){         //BACKSPACE
    if(gameOver){return;}
    masterLetterList.pop();
    letterboxArray[masterLetterList.length].textContent = "";
    letterboxArray[masterLetterList.length].classList.remove("filled-letterbox"); 
    
    console.log(masterLetterList.length);
  }
  else if(e.key === "Enter"){             //ENTER
    if(gameOver){return;}
    
  }
  else{                                   //VALID LETTER
    if(gameOver){return;}
    masterLetterList.push(e.key);
    letterboxArray[masterLetterList.length - 1].textContent = e.key.toUpperCase();
    letterboxArray[masterLetterList.length - 1].classList.add("filled-letterbox");
  }


})