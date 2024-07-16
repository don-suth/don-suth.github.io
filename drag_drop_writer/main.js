let canvas;

function dragElement(event) {
    event.dataTransfer.setData("char", event.target.innerText);
    document.getElementById("feedback").innerText = event.dataTransfer.getData("char");
}

function allowDrop(event) {
    event.preventDefault();
}

function dropElement(event) {
    event.preventDefault();
    document.getElementById("feedback").innerText = "Dropped " + event.dataTransfer.getData("char");

}

function createLetter(letter) {
    let mySpan = document.createElement("span")
    mySpan.draggable = true;
    mySpan.className = "draggable_text";
    mySpan.innerText = letter;
    mySpan.addEventListener("dragstart", dragElement);
    document.getElementById("text_container").appendChild(mySpan);
}

function initialise() {
    let alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    alphabet.forEach(createLetter);
    document.getElementById("feedback").innerText = "";
    canvas = new fabric.Canvas(document.getElementById("canvas"));
}

document.addEventListener("DOMContentLoaded", initialise);