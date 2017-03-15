import { app, BrowserWindow, Menu, dialog} from 'electron';
import { enableLiveReload } from 'electron-compile';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let currentFile = null;

const menuTemp = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New',
        accelerator: 'CmdOrCtrl+N',
        click() {
          mainWindow.webContents.send('system', 'new');
          currentFile = null;
        }
      },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click() {
          save();
        }
      },
      {
        label: 'Save As',
        accelerator: 'CmdOrCtrl+Shift+S',
        click() {
          saveAs();
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Load',
        click() {
          let file = dialog.showOpenDialog(mainWindow, {
            properties: ['openFile'],
            filters: [
              {name: "DeskSketch", extensions: ['dsk']},
              {name: "All Files", extensions: ['*']}
            ]
          });

          if(file != null) {
            mainWindow.webContents.send('file', file);
            currentFile = file;
          }
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Close',
        click() {
          app.exit();
        }
      }
    ]
  }
]

const save = () => {
  if(currentFile != null) {
    mainWindow.webContents.send('save', currentFile);
  } else {
    saveAs();
  }
}

const saveAs = () => {
  let path = dialog.showSaveDialog(mainWindow, {
    defaultPath: app.getPath('documents'),
    filters: [
      {name: "DeskSketch", extensions: ['dsk']},
      {name: "All Files", extensions: ['*']}
    ]
  });

  if(path != null) {
    currentFile = path;
    mainWindow.webContents.send('save', path);
  }
}

const createWindow = () => {
  
  enableLiveReload();

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "LEDDesk"
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemp));

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
