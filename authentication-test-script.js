//using XML request

let isWord = true;
let testWord = prompt("Enter a word: ");

const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		if(this.status === 404){
      isWord = false; 
    }
	}
});

xhr.open("GET", `https://wordsapiv1.p.rapidapi.com/words/${testWord}`, false);
xhr.setRequestHeader("X-RapidAPI-Key", "bd5ed6e78emshe67a950d2b6efecp1f1255jsn7ab94a230ac9");
xhr.setRequestHeader("X-RapidAPI-Host", "wordsapiv1.p.rapidapi.com");

xhr.send(data);

if(isWord === true){
  console.log("Yep, that's a word");
}
else{
  console.log("Nope, that's not a word");
}

//using fetch 

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'bd5ed6e78emshe67a950d2b6efecp1f1255jsn7ab94a230ac9',
// 		'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
// 	}
// };

// fetch('https://wordsapiv1.p.rapidapi.com/words/hatchback/typeOf', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

