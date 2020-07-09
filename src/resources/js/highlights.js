let moves;
let field;

function highlightOn(img) {
    img.parentElement.className = "highlighted";
    let parentId = img.parentElement.id;
    parentId = parentId.split("");
    let j = parentId[0].charCodeAt(0) - 96;
    let i = parseInt(parentId[1]);
    console.log(i, j);
    console.log(Board[i][j]);
    field = Board[i][j];
    let figure = Board[i][j].occupyingFigure;
    switch(figure.type) {
        case "rook":
            moves = rookMoves(figure.color, i, j);
            break;
        case "pawn":
            moves = pawnMoves(figure.color, i, j);
            break;
        case "bishop":
            moves = bishopMoves(figure.color, i, j);
            break;
        case "queen":
            moves = queenMoves(figure.color, i, j);
            break;
        case "knight":
            moves = knightMoves(figure.color, i, j);
            break;
    }
    console.log(moves);
    for (element of moves) {
        document.getElementById(getSymbol(element)).className = "highlighted";
        document.getElementById(getSymbol(element)).setAttribute("ondrop", "drop(event)");
        document.getElementById(getSymbol(element)).setAttribute("ondragover", "allowDrop(event)");
    }
}

function highlightOff(img) {
    img.parentElement.className = "field";
        let parentId = img.parentElement.id;
        parentId = parentId.split("");
        let j = parentId[0].charCodeAt(0) - 96;
        let i = parentId[1];
        for (element of moves) {
            document.getElementById(getSymbol(element)).className = "field";
            document.getElementById(getSymbol(element)).removeAttribute("ondrop");
            document.getElementById(getSymbol(element)).removeAttribute("ondragover");
        }
}
function allowDrop(ev) {
    ev.preventDefault();
}

let lastField;

function clearLastField() {
    lastField.className = "field";
    console.log(lastField);
}

function drag(ev) {
    lastField = ev.target.parentElement;
    ev.dataTransfer.setData("text", lastField.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data).children[0]);
}