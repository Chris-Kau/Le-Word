const btn = document.getElementById('submit');
const customTextField = document.getElementById('customInput');
const errorMsg = document.getElementById('error-msg');
const randomBtn = document.getElementById("randomBtn");
const body = document.getElementById('body');
let answerList = [];
document.addEventListener("DOMContentLoaded", ()=>{
    window.electron.getWords().then(words =>{
        words[0].forEach(word => {answerList.push(word);})
    });
    answer = answerList[Math.floor(Math.random() * answerList.length)].toUpperCase().split('');
});
btn.addEventListener('click', ()=>{
    errorMsg.innerHTML = ' '
    if(customTextField.value.length != 5){
        errorMsg.innerHTML = "Please enter a 5 letter word";
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