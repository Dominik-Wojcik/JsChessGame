let moves;
let field;

function highlightOn(img) {
    img.parentElement.className = "highlighted";
    let parentId = img.parentElement.id;
    let numbers = getNumbersFromSymbol(parentId);
    let i = numbers[0];
    let j = numbers[1];
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
        let i, j = getNumbersFromSymbol(parentId)
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

function drag(ev) {
    lastField = ev.target.parentElement.id;
    ev.dataTransfer.setData("text", lastField);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    let lastFieldNumbers = getNumbersFromSymbol(data);
    let i = lastFieldNumbers[0];
    let j = lastFieldNumbers[1];
    let type = Board[i][j].occupyingFigure.type;
    Board[i][j].occupyingFigure.type="none";
    Board[i][j].occupyingFigure.color="none";
    let thisFieldNumbers = getNumbersFromSymbol(ev.target.id);
    let ii = thisFieldNumbers[0];
    let jj = thisFieldNumbers[1];
    Board[ii][jj].occupyingFigure.color = "white";
    Board[ii][jj].occupyingFigure.type = type;
    console.log(Board[ii][jj]);
    clearLastField();
    localStorage.setItem('Board', JSON.stringify(Board));
    updateBoard();
}

function clearLastField() {
    lastField.className = "field";
    console.log(lastField);
}
