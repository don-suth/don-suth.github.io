function dragElement(event) {
    document.getElementById("feedback").innerText = event.target.innerText;
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
}