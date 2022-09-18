let currentWord = "score";
let masterLetterArray = []; 
let gameOver = false;

const letterboxNodeList = document.querySelectorAll(".letterbox");
let letterboxArray = Array.from(letterboxNodeList);

const acceptableKeys = ["A", "B", "C", "D", "E", "F", "G",
"H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s",
"t","u","v","w","x","y","z","Enter", "Backspace", "ENTER", "BACK"];

window.addEventListener("keydown", (e) => {

if(!acceptableKeys.includes(e.key)){
  return; 
}
else if(e.key === "Backspace"){
  if(gameOver){
    return;
  }
  masterLetterArray.pop();
  letterboxArray[masterLetterArray.length].textContent = "";
  letterboxArray[masterLetterArray.length].classList.remove("filled-letterbox");
}
else if(e.key === "Enter"){
  if(gameOver){
    return;
  }
  console.log(e.key);
}
else{
  if(gameOver){
    return;
  }
  masterLetterArray.push(e.key);
  letterboxArray[masterLetterArray.length - 1].textContent = e.key.toUpperCase();
  letterboxArray[masterLetterArray.length - 1].classList.add("filled-letterbox");
}



})