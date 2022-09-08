let currentWord = "HOOPS";
const currentWordArray = Array.from(currentWord); 
let  masterGuessList = [];
const letterboxNodeList = document.querySelectorAll(".letterbox");
let letterboxArray = Array.from(letterboxNodeList);
const keyNodeList = document.querySelectorAll(".key");
const acceptableKeys = ["A", "B", "C", "D", "E", "F", "G",
"H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s",
"t","u","v","w","x","y","z","Enter", "Backspace",];
let testWordArray = [];
let offLimitsCount = 0;
let letterCount = 0;  

for(let i = 0; i < letterboxNodeList.length; i++){
  
  letterboxNodeList[i].id = `letterbox-${i}`;

}

//for window keydowns

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
    letterboxArray[masterGuessList.length].style.border = "2px solid rgb(192, 189, 189)";
  
  }
  
  else if(e.key === "Enter"){
  
    if(masterGuessList.length%5 === 0 & masterGuessList.length > 0){
      letterCount = 0;
      offLimitsCount = masterGuessList.length; 
    }
      
    if((masterGuessList.length)%5 !== 0 || masterGuessList.length === 0){
      
      alert("Not enough letters");
      return;
    
    }
    else{
      
      testWordArray = [];
      for(let i = masterGuessList.length - 5; i < masterGuessList.length; i++){
        
        testWordArray.push(masterGuessList[i].toUpperCase());
      
      }
      
      for(let i = 0; i < testWordArray.length; i++){ 

        if(currentWordArray.includes(testWordArray[i])){
          
          if(currentWordArray[i] === testWordArray[i]){
            
            let currentLetterBox = document.getElementById(`letterbox-${i + (((masterGuessList.length)/5) - 1)*5}`);
            let currentKey = document.getElementById(`${testWordArray[i]}`);
            
            currentLetterBox.classList.add("success");
            currentKey.classList.add("success");
            
          }
          else{
            
            let currentLetterBox = document.getElementById(`letterbox-${i + (((masterGuessList.length)/5) - 1)*5}`);
            let currentKey = document.getElementById(`${testWordArray[i]}`);
            
            currentLetterBox.classList.add("near-success");
            currentKey.classList.add("near-success");
            
          }
        }
        else{
          
          let currentLetterBox = document.getElementById(`letterbox-${i + (((masterGuessList.length)/5) - 1)*5}`);
          let currentKey = document.getElementById(`${testWordArray[i]}`);
          
          currentLetterBox.classList.add("fail");
          currentKey.classList.add("fail");
        
        }
      }
    }
  }
  else{

    if(letterCount >= 5){
      return; 
    }

    masterGuessList.push(e.key);
    letterboxArray[masterGuessList.length - 1].textContent = e.key.toUpperCase();
    letterboxArray[masterGuessList.length - 1].style.border = "2px solid #777";
    letterCount += 1;
    
  }

})






