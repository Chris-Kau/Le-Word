const btn = document.getElementById('submit');
const customTextField = document.getElementById('customInput');
const errorMsg = document.getElementById('error-msg');
const randomBtn = document.getElementById("randomBtn");
const body = document.getElementById('body');
let answerList = [];
let additionalWordsList = [];
document.addEventListener("DOMContentLoaded", ()=>{
    window.electron.getWords().then(words =>{
        words[0].forEach(word => {answerList.push(word.toUpperCase());})
        words[1].forEach(word => {additionalWordsList.push(word.toUpperCase())})
    });
    answer = answerList[Math.floor(Math.random() * answerList.length)].split('');
});
btn.addEventListener('click', ()=>{
    errorMsg.innerHTML = ' '
    let validChars = true;
    customTextField.value.toUpperCase().split('').forEach(char =>{
        if(!"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').includes(char)){
            validChars = false;
        }
    })
    if(customTextField.value.length != 5){
        errorMsg.innerHTML = "Please enter a 5 letter word";
    }else if(!validChars){
        errorMsg.innerHTML = "Please only use chars A-Z";
    }else if(![...answerList,...additionalWordsList].includes(customTextField.value.toUpperCase())){
        errorMsg.innerHTML = "Please enter a valid word";
    }else{
        window.electron.setAnswer(customTextField.value)
        window.close();
    }
})

randomBtn.addEventListener('click', ()=>{
    let loadingOverlay = document.createElement('div')
    body.appendChild(loadingOverlay);
    window.electron.setAnswer(answerList[Math.floor(Math.random() * answerList.length)]);
    window.close();
})