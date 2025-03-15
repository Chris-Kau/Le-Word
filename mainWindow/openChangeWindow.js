const btn = document.getElementById('changeWord');

function submitWord(){
    btn.blur();
    window.electron.openChange();
}

btn.addEventListener("click", submitWord)