currentWord = "score"; 
let gameOver = false;
let masterLetterList = [];
const acceptableKeys = ["A", "B", "C", "D", "E", "F", "G",
"H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s",
"t","u","v","w","x","y","z","Enter", "Backspace", "ENTER", "BACK"];


window.addEventListener("keydown", (e) => {

  if(!acceptableKeys.includes(e.key)){    //INVALID KEY 
    return;
  }
  else if(e.key === "Backspace"){         //BACKSPACE

  }
  else if(e.key === "Enter"){             //ENTER

  }
  else(){                                 //VALID KEY

  }


});