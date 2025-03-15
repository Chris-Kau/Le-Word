let mainIn = document.getElementById("mainInput");
let body = document.getElementById("body");
let keys = document.querySelectorAll('div.key');
let answer = ''
document.addEventListener("DOMContentLoaded", ()=>{
    const apiUrl = 'https://random-word-api.herokuapp.com/word?length=5';
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        answer = data[0].split('');
      })
      .catch(error => console.error('Error fetching random word:', error));
});
let letters = ['A','B','C','D','E','F'];
let divRows = [];
let currentRow = 0;
let charPos = 0;
let win = false;
let confettidiv;
for(let i = 0; i < 6; i++){ 
    let temp = []
    for(let j = 1; j < 6; j++){ 
        var div = document.createElement('div');
        div.className = 'box';
        div.id = letters[i].concat('',j);
        mainIn.appendChild(div)
        temp.push(div)
    }
    divRows.push(temp)
}

function checkGuess(guess){
    perfects = [];
    okays = [];
    answercopy = [];
    answer.forEach(l => answercopy.push(l));
    console.log(answercopy);
    for(let i = 0; i < 5; i++){
        if(guess[i] == answer[i]){
            answercopy[i] = "_";
            perfects.push(i);
        }
    }
    for(let i = 0; i< 5; i++){
        if(answercopy.includes(guess[i]) && !perfects.includes(i)){
            answercopy[answercopy.indexOf(guess[i])] = "_";
            okays.push(i);
        }

    }

    return [perfects, okays];
}

function displayLetters(key, divs){
    if(charPos >= 0 && charPos <= 4 && key.length == 1){
        divs[charPos].innerHTML = key;
        charPos++;
    }else if(key == "Backspace" && charPos > 0){
        charPos--;
        divs[charPos].innerHTML = '';
    }else if(key == "Enter" && charPos == 5 && currentRow < 6){
        charPos = 0;
        currentRow++;
        let guess = ''
        for(let i = 0; i < divs.length; i++){
            divs[i].style.backgroundColor = "#595959";
            guess = guess.concat('', divs[i].innerHTML)
        }
        let result = checkGuess(guess);
        let perfects = result[0];
        let okays = result[1];
        
        perfects.forEach(index =>{ 
            divs[index].style.backgroundColor = "green"}
        ); 
        okays.forEach(index => divs[index].style.backgroundColor = "yellow");

        if (perfects.length == 5){
            win = true;
            playConfetti();
        }
    }
}

function keyPress(event){
    let key = event.key;
    if(!win)
        displayLetters(key, divRows[currentRow]);

}

function playConfetti(){
    confettidiv = document.createElement('div');
    confettidiv.className = "confetti";
    body.appendChild(confettidiv);
}

function resetGame(){
    currentRow = 0;
    charPos = 0;
    win = false;
    divRows.forEach((divList) => {
        divList.forEach((div) => {
            div.innerHTML = '';
            div.style.backgroundColor = '#151515';
        })
    });
    if(confettidiv){
        confettidiv.remove();
    }
}

document.addEventListener('keydown', keyPress)

window.electron.receive("answer-updated", (newAnswer) => {
    answer = newAnswer.split(''); 
    resetGame();
});