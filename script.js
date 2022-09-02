let currentWord = "TRADE";
const currentWordArray = Array.from(currentWord); 
let  masterGuessList = [];
const letterboxNodeList = document.querySelectorAll(".letterbox");
let letterboxArray = Array.from(letterboxNodeList);
const acceptableKeys = ["A", "B", "C", "D", "E", "F", "G",
"H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s",
"t","u","v","w","x","y","z","Enter", "Backspace",];
let testWordArray = [];

for(let i = 0; i < letterboxNodeList.length; i++){
  letterboxNodeList[i].id = `letterbox-${i}`;
}


window.addEventListener("keydown", (e) => {
  
  if(!acceptableKeys.includes(e.key)){
    return;
  }
  
  else if(e.key === "Backspace"){
    masterGuessList.pop();
    letterboxArray[masterGuessList.length].textContent = "";
  }
  
  else if(e.key === "Enter"){
    if ((masterGuessList.length)%5 !== 0 || masterGuessList.length === 0){
      alert("Not enough letters");
      return;
    }
    else{
      
      testWordArray = [];
      
      for(let i = masterGuessList.length - 5; i < masterGuessList.length; i++){
        testWordArray.push(masterGuessList[i].toUpperCase());
      }
      
      for(let i = 0; i < testWordArray.length; i++){
        if(testWordArray[i] === currentWordArray[i]){
          let currentLetterBox = document.getElementById(`letterbox-${i + (((masterGuessList.length)/5) - 1)*5}`);
          currentLetterBox.style.backgroundColor = "#6aaa64"; 
          currentLetterBox.style.color = "white";
          currentLetterBox.style.border = "none"; 
        }
        else if(currentWordArray.includes(testWordArray[i])){
          let currentLetterBox = document.getElementById(`letterbox-${i + (((masterGuessList.length)/5) - 1)*5}`);
          currentLetterBox.style.backgroundColor = "#c9b458"; 
          currentLetterBox.style.color = "white";
          currentLetterBox.style.border = "none"; 
        }
        else{
          let currentLetterBox = document.getElementById(`letterbox-${i + (((masterGuessList.length)/5) - 1)*5}`);
          currentLetterBox.style.backgroundColor = "#787c7e"; 
          currentLetterBox.style.color = "white";
          currentLetterBox.style.border = "none";
        }
      }
      
    }
  }

  else{
    masterGuessList.push(e.key);
    letterboxArray[masterGuessList.length - 1].textContent = e.key.toUpperCase();
  }

})
