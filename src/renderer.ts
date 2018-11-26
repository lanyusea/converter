// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {ipcRenderer} = require('electron')
const { dialog } = require('electron').remote


function getFile() {
    console.log("haha")

    dialog.showOpenDialog( {properties: ['openFile', 'multiSelections']}, function (fileNames) {
        console.log(fileNames);
    });

    ipcRenderer.send("file_upload")
}

document.querySelector('#btnGetFile').addEventListener('click', getFile)
