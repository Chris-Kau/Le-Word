const { app, BrowserWindow, ipcMain } = require('electron')

let mainWindow

const createWindow = () => {
    mainWindow = new BrowserWindow({
    width: 400,
    height: 550,
    autoHideMenuBar: true,
    webPreferences: {
      preload: __dirname + "/preload.js",
    },
  })
  mainWindow.loadFile('./mainWindow/index.html')
}

app.whenReady().then(() => {
  createWindow()
})

ipcMain.on("open-change-word-window", ()=>{
  const win = new BrowserWindow({
    width: 300,
    height: 300,
    resizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: __dirname + "/preload.js"
    }
  })
  console.log("Create Change Word Window")
  win.loadFile("./changeWordWindow/changeWord.html");
});


ipcMain.on("set-answer", (e, newAnswer) => {
  console.log("New answer set:", newAnswer);
  let currentAnswer = newAnswer;

  if (mainWindow) {
      // Send the updated answer to Window 1 (main window)
      mainWindow.webContents.send("answer-updated", currentAnswer);
  }
});