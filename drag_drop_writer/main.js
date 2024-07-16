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
        fontSize: fabric.util.parseUnit("3em"),
        fontFamily: "stickandball"
    });
    newChar.set("left", event.layerX - event.dataTransfer.getData("x_offset"));
    newChar.set("top", event.layerY - event.dataTransfer.getData("y_offset"));
    canvas.add(newChar);
    //document.getElementById("feedback").innerText = "Dropped " + event.dataTransfer.getData("char");
    document.querySelectorAll("canvas").forEach(function (element) {
       element.style.zIndex = "0";
    });
}

function createLetter(letter, classname, container_id) {
    let mySpan = document.createElement("span")
    mySpan.draggable = true;
    mySpan.className = classname;
    mySpan.innerText = letter;
    mySpan.addEventListener("dragstart", dragElement);
    document.getElementById(container_id).appendChild(mySpan);
}

function downloadImage() {
    let link = document.createElement("a");
    link.download = "text_writer.png"
    link.href = document.getElementById("canvas").toDataURL("image/png");
    link.click();
}

function initialise() {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    alphabet.forEach(function (letter) { createLetter(letter, "draggable_text", "lowercase_container")});
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    alphabet.forEach(function (letter) { createLetter(letter, "draggable_text","uppercase_container")});

    //document.getElementById("feedback").innerText = "";

    let downloadButton = document.createElement("button");
    downloadButton.innerText = "Save";
    downloadButton.id = "download_button";
    downloadButton.addEventListener("click", downloadImage);
    document.getElementById("lowercase_container").appendChild(downloadButton);

    alphabet = ".?!".split('');
    alphabet.forEach(function (letter) { createLetter(letter, "draggable_text punctuation","lowercase_container")});

    let client_width = document.documentElement.clientWidth;
    let client_height = document.documentElement.clientHeight;

    let canvas_element = document.getElementById("canvas");
    let toolbar_element = document.getElementById("bottom_toolbar");

    canvas_element.height = client_height - toolbar_element.offsetHeight - 16;
    canvas_element.width = client_width - 16;

    canvas = new fabric.Canvas("canvas", {
        selection: false,
        backgroundColor: "rgba(255,255,255,1)"
    });

    let font_size_in_pixels = fabric.util.parseUnit("3em");
    for ( let i = font_size_in_pixels; i < client_height - toolbar_element.offsetHeight; i += font_size_in_pixels) {
        canvas.add(new fabric.Line(
            [0, i, client_width, i],
            {
                selectable: false,
                stroke: "rgba(0,0,0,0.3)"
            }
        ))
    }
}

document.addEventListener("DOMContentLoaded", initialise);