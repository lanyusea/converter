// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {ipcRenderer} = require('electron')
const infoArea = document.getElementById( 'file-upload-filename' );

ipcRenderer.on('convert', (event:any, result:string) => {
    let div = document.createElement("div");
    div.setAttribute('class', 'default');
    div.innerHTML = result;
    document.getElementById("file-convert-result").prepend(div);
})

function getFile() {
    let fileNames = ipcRenderer.sendSync("file_upload")
    infoArea.textContent = "File name: \r\n";
    fileNames.forEach(function(value:string){
        infoArea.textContent += ("> "+value+" \r\n");
    })
}

function convert() {
    let chooseList = <HTMLInputElement>document.getElementById("video_type");
    let videoType = chooseList.value;
    ipcRenderer.send("convert", videoType)
}

document.querySelector('#btnGetFile').addEventListener('click', getFile)
document.querySelector('#btnConvert').addEventListener('click', convert)
