// @ts-ignore
import { app, dialog, BrowserWindow } from "electron";
import * as path from "path";

class fileTypeConverter {
    private fileList: string[];
    private ffmpeg: any;

    constructor() {
        this.ffmpeg = require('fluent-ffmpeg');
        let ffmpeg_path = require('ffmpeg-static-electron');
        this.ffmpeg.setFfmpegPath(ffmpeg_path.path);
    }

    load(fileNames:string[]){
        this.fileList = fileNames;
        return this.fileList;
    }
    convert(event_:any, type:string){
        for(let entry of this.fileList){
            let newName = entry.slice(0, -path.extname(entry).length) + '.' + type;

            this.ffmpeg(entry)
                .toFormat(type)
                .saveToFile(newName)
                .on('progress', function(progress:any) {
                    event_.sender.send('convert', 'Processing '+ entry +' : ' + progress.percent + '% done');
                })
                .on('end', function() {
                    event_.sender.send('convert', 'File ' + entry + ' has been converted successfully');
                })
                .on('error', function(err:any) {
                    event_.sender.send('convert', 'An error happened when convert ' + entry + ' : ' + err.message);
                });
        }
   }
}

const {ipcMain} = require('electron')
let mainWindow: Electron.BrowserWindow;
const fileConverter = new fileTypeConverter();

function DataRecvInfo(event:any){
    dialog.showOpenDialog( {properties: ['openFile', 'multiSelections']}, function (fileNames) {
        event.returnValue = fileConverter.load(fileNames);
    });
}

function ConvertReq(event:any, videoType:string){
    event.returnValue = fileConverter.convert(event, videoType);
}

ipcMain.on("file_upload", DataRecvInfo);
ipcMain.on("convert", ConvertReq);

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
    });

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "../index.html"));
    mainWindow.webContents.openDevTools();
    // Emitted when the window is closed.
    mainWindow.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
