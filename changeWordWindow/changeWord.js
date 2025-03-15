const btn = document.getElementById('submit');
const customTextField = document.getElementById('customInput');
const errorMsg = document.getElementById('error-msg');
const randomBtn = document.getElementById("randomBtn");
const body = document.getElementById('body');

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
    loadingOverlay.className = "overlay";
    body.appendChild(loadingOverlay);
    const apiUrl = 'https://random-word-api.herokuapp.com/word?length=5';
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        window.electron.setAnswer(data[0]);
        window.close();
      })
      .catch(error => console.error('Error fetching random word:', error));
})