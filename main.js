const { app, BrowserWindow, ipcMain } = require('electron')
const getWords = require('./getWords');
let mainWindow
let changeWordWindow

const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock){
  app.quit()
}else{
  app.on('second-instance', (event, commandLine, workingDirectory, additionalData)=>{
    console.log(additionalData)
    if(mainWindow){
      if(mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

const createWindow = () => {
    mainWindow = new BrowserWindow({
    width: 400,
    height: 640,
    resizable: false,
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


app.on('window-all-closed', () => {
  // On macOS, apps typically stay open even when all windows are closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // macOS behavior: re-create the window when the dock icon is clicked
  if (!mainWindow) {
    createMainWindow();
  }
});



ipcMain.on("open-change-word-window", ()=>{
  if(changeWordWindow){
    if(changeWordWindow.isMinimized()) changeWordWindow.restore();
    changeWordWindow.focus();
    return
  }
  changeWordWindow= new BrowserWindow({
    width: 300,
    height: 300,
    resizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: __dirname + "/preload.js"
    }
  })
  console.log("Create Change Word Window")
  changeWordWindow.loadFile("./changeWordWindow/changeWord.html");
  changeWordWindow.on("closed", () => {
    changeWordWindow = null;
  });
});


ipcMain.on("set-answer", (e, newAnswer) => {
  console.log("New answer set:", newAnswer);
  let currentAnswer = newAnswer;

  if (mainWindow) {
      // Send the updated answer to Window 1 (main window)
      mainWindow.webContents.send("answer-updated", currentAnswer);
  }
});

ipcMain.handle("get-words", async () => {
  return await getWords();
});
