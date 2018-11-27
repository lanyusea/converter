"use strict";
exports.__esModule = true;
// @ts-ignore
var electron_1 = require("electron");
var path = require("path");
var fileTypeConverter = /** @class */ (function () {
    function fileTypeConverter() {
    }
    fileTypeConverter.prototype.load = function (fileNames) {
        this.fileList = fileNames;
        console.log(this.fileList);
        return this.fileList;
    };
    fileTypeConverter.prototype.convert = function () {
        /* TODO
         * 1. called by ipcRender
         * 2. do the convert
         * 3. reply by ipcMain
         */
    };
    fileTypeConverter.prototype.save = function () {
        /* TODO
         * 1. called by ipcRender
         * 2. save the file
         * 3. reply by ipcMain
         */
    };
    return fileTypeConverter;
}());
var ipcMain = require('electron').ipcMain;
var mainWindow;
var fileConverter = new fileTypeConverter();
function DataRecvInfo(event) {
    electron_1.dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }, function (fileNames) {
        event.returnValue = fileConverter.load(fileNames);
    });
}
ipcMain.on("file_upload", DataRecvInfo);
function createWindow() {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        height: 600,
        width: 800
    });
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "../index.html"));
    mainWindow.webContents.openDevTools();
    // Emitted when the window is closed.
    mainWindow.on("closed", function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on("ready", createWindow);
// Quit when all windows are closed.
electron_1.app.on("window-all-closed", function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", function () {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
//# sourceMappingURL=main.js.map