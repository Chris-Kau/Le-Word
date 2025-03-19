const mainIn = document.getElementById("mainInput");
const body = document.getElementById("body");
const loseMessage = document.getElementById("loseMessage");
let answerList = [];
let guessList = [];

let keys = Array.from(keyboardDiv1.querySelectorAll('div'))
    .concat(Array.from(keyboardDiv2.querySelectorAll('div')))
    .concat(Array.from(keyboardDiv3.querySelectorAll('div')));

loseMessage.innerHTML = '&nbsp;';
let answer;
window.electron.getWords().then(words =>{
    words[0].forEach(word => {answerList.push(word.toUpperCase());})
    words[1].forEach(word => {guessList.push(word.toUpperCase());})
    answer = answerList[Math.floor(Math.random() * answerList.length)].toUpperCase().split('');

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
    answer.forEach(l => answercopy.push(l.toUpperCase()));
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
    if(key == " ")
        return;
    if(charPos >= 0 && charPos <= 4 && key.length == 1){
        divs[charPos].innerHTML = key;
        charPos++;
    }else if(key == "BACKSPACE" && charPos > 0){
        charPos--;
        divs[charPos].innerHTML = '';
    }else if(key == "ENTER" && charPos == 5 && currentRow < 6){
        let guess = '';
        for(let i = 0; i < divs.length; i++)
            guess = guess.concat('', divs[i].innerHTML);
        if(!guessList.includes(guess) && !answerList.includes(guess)){
            console.log("answer not in word list");
            for(let i = 0; i < divs.length; i++){
                divs[i].style.animation = "shake .1s";
            }
            setTimeout(() => {
                for(let i = 0; i < divs.length; i++){
                    divs[i].style.animation = "none";
                }
            }, 100);

            return;
        }
        charPos = 0;
        currentRow++;
        //set all divs in row to grey
        for(let i = 0; i < divs.length; i++){
            divs[i].style.backgroundColor = "#595959";
            document.getElementById(`key${divs[i].innerHTML}`).style.backgroundColor = "#595959";
        }

        let result = checkGuess(guess);
        let perfects = result[0];
        let okays = result[1];
        
        //set all divs in row and keyboard to yellow
        okays.forEach(index => {
            divs[index].style.backgroundColor = "#B59F3B";
            document.getElementById(`key${divs[index].innerHTML}`).style.backgroundColor = "#B59F3B";
        });
         //set all divs in row and keyboard to green
        perfects.forEach(index =>{ 
            divs[index].style.backgroundColor = "#528C4E";
            document.getElementById(`key${divs[index].innerHTML}`).style.backgroundColor = "#528C4E";
        }); 

        if (perfects.length == 5){
            win = true;
            playConfetti();
        }
        if(!win && currentRow == 6){
            loseMessage.innerHTML = `THE WORD WAS ${answer.join('')}`;
        }
    }
}

function keyPress(event){
    let key = event.key.toUpperCase();
    if(!win)
        displayLetters(key, divRows[currentRow]);

}

function playConfetti(){
    confettidiv = document.createElement('div');
    confettidiv.className = "confetti";
    body.appendChild(confettidiv);
}

function resetGame(){
    loseMessage.innerHTML = '&nbsp;';
    currentRow = 0;
    charPos = 0;
    win = false;
    divRows.forEach((divList) => {
        divList.forEach((div) => {
            div.innerHTML = '';
            div.style.backgroundColor = '#151515';
        })
    });

    keys.forEach(key =>{
        key.style.backgroundColor = "#151515"
    })

    if(confettidiv){
        confettidiv.remove();
    }
}

document.addEventListener('keydown', keyPress)

window.electron.receive("answer-updated", (newAnswer) => {
    answer = newAnswer.toUpperCase().split(''); 
    resetGame();
});