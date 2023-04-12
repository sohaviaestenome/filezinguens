const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const dotenv = require("dotenv");
const { moveFilesToParentFolder } = require('./movefiles');

dotenv.config();

console.log('Preload path:', path.join(__dirname, 'preload.js'));

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  const url =
    process.env.ELECTRON_ENV === "development"
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`;

  win.loadURL(url);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

//origin folder selection
ipcMain.handle('select-folders', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory', 'multiSelections'],
  });
  return result.filePaths;
});

//destination folder selection
ipcMain.handle('select-folder', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });
  return result.filePaths;
});

//function call to execute move
ipcMain.on('move-files-to-parent', (event, folders, destinationFolder) => {
  moveFilesToParentFolder(folders, destinationFolder);
});