// main.js
const { app, BrowserWindow } = require("electron")
import * as path from 'path';
import * as url from 'url';
import { init } from '@sentry/electron/dist/main'
import * as Sentry from '@sentry/electron'
let win;

// Sentry SDKのinit。この後、
init({dsn: 'https://c367e13160724e94af531b9e2d19f682@o416167.ingest.sentry.io/5310008'})

// 画面表示（レンダラプロセス起動）
function createWindow() {
  win = new BrowserWindow({ 
    webPreferences: {
      nodeIntegration: true
    }, 
    width: 800, 
    height: 600, 
    webSecurity: false 
  });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  );
  win.on("closed", () => { win = null; });
}

// readyのライフサイクルでレンダラプロセスを表示
app.on("ready", createWindow);

// ウィンドウを全部閉じたらappを終了
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// ウィンドウアクティブ時にwinオブジェクトがなければ画面表示
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
})
