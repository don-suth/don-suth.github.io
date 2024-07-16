let canvas;

function dragElement(event) {
    event.dataTransfer.setData("char", event.target.innerText);
    event.dataTransfer.setData("x_offset", event.offsetX);
    event.dataTransfer.setData("y_offset", event.offsetY);
    //document.getElementById("feedback").innerText = event.dataTransfer.getData("char");
    document.querySelectorAll("canvas").forEach(function (element) {
       element.style.zIndex = "-1";
    });
}

function allowDrop(event) {
    event.preventDefault();
}

function dropElement(event) {
    event.preventDefault();
    let newChar = new fabric.Text(event.dataTransfer.getData("char"), {
        hasControls: false,
        fontSize: fabric.util.parseUnit("3em")
    });
    newChar.set("left", event.layerX - event.dataTransfer.getData("x_offset"));
    newChar.set("top", event.layerY - event.dataTransfer.getData("y_offset"));
    canvas.add(newChar);
    //document.getElementById("feedback").innerText = "Dropped " + event.dataTransfer.getData("char");
    document.querySelectorAll("canvas").forEach(function (element) {
       element.style.zIndex = "0";
    });
}

function createLetter(letter) {
    let mySpan = document.createElement("span")
    mySpan.draggable = true;
    mySpan.className = "draggable_text";
    mySpan.innerText = letter;
    mySpan.addEventListener("dragstart", dragElement);
    document.getElementById("text_container").appendChild(mySpan);
}

function downloadImage() {
    let link = document.createElement("a");
    link.download = "text_writer.png"
    link.href = document.getElementById("canvas").toDataURL("image/png");
    link.click();
}

function initialise() {
    let alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    alphabet.forEach(createLetter);
    //document.getElementById("feedback").innerText = "";
    canvas = new fabric.Canvas("canvas", {
        selection: false
    });
    document.getElementById("download").addEventListener("click", downloadImage);
}

document.addEventListener("DOMContentLoaded", initialise);