// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var ipcRenderer = require('electron').ipcRenderer;
var dialog = require('electron').remote.dialog;
function getFile() {
    console.log("haha");
    dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }, function (fileNames) {
        console.log(fileNames);
    });
    ipcRenderer.send("file_upload");
}
document.querySelector('#btnGetFile').addEventListener('click', getFile);
//# sourceMappingURL=renderer.js.map