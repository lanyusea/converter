// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var ipcRenderer = require('electron').ipcRenderer;
var infoArea = document.getElementById('file-upload-filename');
function getFile() {
    var fileNames = ipcRenderer.sendSync("file_upload");
    infoArea.textContent = "File name: \r\n";
    fileNames.forEach(function (value) {
        infoArea.textContent += ("> " + value + " \r\n");
    });
}
function convert() {
    var chooseList = document.getElementById("video_type");
    var videoType = chooseList.value;
    ipcRenderer.sendSync("convert", videoType);
}
document.querySelector('#btnGetFile').addEventListener('click', getFile);
document.querySelector('#btnConvert').addEventListener('click', convert);
//# sourceMappingURL=renderer.js.map