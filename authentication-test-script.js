const btn = document.getElementById("submit");

const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;


btn.addEventListener("click", () => {
  
  const word = document.getElementById("word").value;

  xhr.open("GET", `https://wordsapiv1.p.rapidapi.com/words/${word}`);
  xhr.setRequestHeader("X-RapidAPI-Key", "bd5ed6e78emshe67a950d2b6efecp1f1255jsn7ab94a230ac9");
  xhr.setRequestHeader("X-RapidAPI-Host", "wordsapiv1.p.rapidapi.com");

  xhr.send(data);

  xhr.onload = function(){
    if(xhr.status === 404){
      alert("not a word");
    }
  }

})