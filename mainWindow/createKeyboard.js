const keyboardDiv1 = document.getElementById("keyboardRow1");
const keyboardDiv2 = document.getElementById("keyboardRow2");
const keyboardDiv3 = document.getElementById("keyboardRow3");
let keyletters1 = "qwertyuiop".split('');
let keyletters2 = "asdfghjkl".split('');
let keyletters3 = "zxcvbnm".split('');
keyletters1.forEach(letter => {
    let div = document.createElement('div');
    div.className = "key";
    div.innerHTML = letter;
    keyboardDiv1.appendChild(div);
});

keyletters2.forEach(letter => {
    let div = document.createElement('div');
    div.className = "key";
    div.innerHTML = letter;
    keyboardDiv2.appendChild(div);
});

keyletters3.forEach(letter => {
    let div = document.createElement('div');
    div.className = "key";
    div.innerHTML = letter;
    keyboardDiv3.appendChild(div);
});