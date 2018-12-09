"use strict";
exports.__esModule = true;
// @ts-ignore
var electron_1 = require("electron");
var path = require("path");
var fileTypeConverter = /** @class */ (function () {
    function fileTypeConverter() {
        this.ffmpeg = require('fluent-ffmpeg');
        var ffmpeg_path = require('ffmpeg-static-electron');
        this.ffmpeg.setFfmpegPath(ffmpeg_path.path);
    }
    fileTypeConverter.prototype.load = function (fileNames) {
        this.fileList = fileNames;
        return this.fileList;
    };
    fileTypeConverter.prototype.convert = function (event_, type) {
        var num = 0;
        var _loop_1 = function (entry) {
            var newName = entry.slice(0, -path.extname(entry).length) + '.' + type;
            this_1.ffmpeg(entry)
                .toFormat(type)
                .saveToFile(newName)
                .on('progress', function (progress) {
                event_.sender.send('convert', 'Processing ' + entry + ' : ' + progress.percent + '% done');
            })
                .on('end', function () {
                event_.sender.send('convert', 'File ' + entry + ' has been converted successfully');
            })
                .on('error', function (err) {
                event_.sender.send('convert', 'An error happened when convert ' + entry + ' : ' + err.message);
            });
            num++;
        };
        var this_1 = this;
        for (var _i = 0, _a = this.fileList; _i < _a.length; _i++) {
            var entry = _a[_i];
            _loop_1(entry);
        }
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
function ConvertReq(event, videoType) {
    event.returnValue = fileConverter.convert(event, videoType);
}
ipcMain.on("file_upload", DataRecvInfo);
ipcMain.on("convert", ConvertReq);
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