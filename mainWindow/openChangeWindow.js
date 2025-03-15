const btn = document.getElementById('changeWord');

function submitWord(){
    window.electron.openChange();
}

btn.addEventListener("click", submitWord)