const {contextBridge, ipcRenderer}  = require('electron');

contextBridge.exposeInMainWorld('electron',{
    openChange: () => ipcRenderer.send('open-change-word-window'),
    setAnswer: (ans) => ipcRenderer.send('set-answer', ans),
    receive: (channel, callback) => ipcRenderer.on(channel, (e, arg) => callback(arg)),
    getWords: () => ipcRenderer.invoke("get-words")
})
