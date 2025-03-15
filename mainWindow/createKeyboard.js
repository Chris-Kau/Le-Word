const keyboardDiv1 = document.getElementById("keyboardRow1");
const keyboardDiv2 = document.getElementById("keyboardRow2");
const keyboardDiv3 = document.getElementById("keyboardRow3");
let keyletters1 = "QWERTYUIOP".split('');
let keyletters2 = "ASDFGHJKL".split('');
let keyletters3 = "ZXCVBNM".split('');
keyletters1.forEach(letter => {
    let div = document.createElement('div');
    div.className = "key";
    div.id = `key${letter}`
    div.innerHTML = letter;
    keyboardDiv1.appendChild(div);
});

keyletters2.forEach(letter => {
    let div = document.createElement('div');
    div.className = "key";
    div.id = `key${letter}`
    div.innerHTML = letter;
    keyboardDiv2.appendChild(div);
});

keyletters3.forEach(letter => {
    let div = document.createElement('div');
    div.className = "key";
    div.id = `key${letter}`
    div.innerHTML = letter;
    keyboardDiv3.appendChild(div);
});