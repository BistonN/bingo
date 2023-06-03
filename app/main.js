const { app, BrowserWindow } = require('electron');

// require('electron-reload')(__dirname, {
//     electron: require(`${__dirname}/node_modules/electron`)
// });

let mainWindow;
let sendNumber;

app.on('activate', () => {
    mainWindow.webContents.openDevTools();
    sendNumber.webContents.openDevTools();
});

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    },);
    mainWindow.loadURL(`${__dirname}/components/index/index.html`);

    sendNumber = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    },);
    sendNumber.loadURL(`${__dirname}/components/send/send.html`);
});

