let currentWord = "TRADE";
const currentWordArray = Array.from(currentWord); 
let  masterGuessList = [];
const letterboxNodeList = document.querySelectorAll(".letterbox");
let letterboxArray = Array.from(letterboxNodeList);

// currentWordArray.forEach((entry) => {
//   console.log(entry);
// });

window.addEventListener("keydown", (e) => {
  if(e.key === "Enter"){
    if ((masterGuessList.length)%5 !== 0){
      alert("Not enough letters");
      return;
    }else{
      // concatenate last 5 of masterGuessList into a string
      // if that string === currentWord, player wins
      //else, check for matches and pseudo-matches 
    }
  }
  if(e.key === "Backspace"){
    masterGuessList.pop();
    letterboxArray[masterGuessList.length].textContent = "";
  } else{
    masterGuessList.push(e.key);
    letterboxArray[masterGuessList.length - 1].textContent = e.key.toUpperCase(); 
  }
});



