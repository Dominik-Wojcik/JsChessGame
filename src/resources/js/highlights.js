let moves;
let field;
let lastField;

function highlightOn(img) {
    img.parentElement.className = "highlighted";
    let parentId = img.parentElement.id;
    let numbers = getNumbersFromSymbol(parentId);
    let i = numbers[0];
    let j = numbers[1];
    field = Board[i][j];
    let figure = Board[i][j].occupyingFigure;
    if (figure.color === activePlayer) {
        switch (figure.type) {
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
            case "king":
                moves = kingMoves(figure.color, i, j);
        }
        for (const element of moves) {
            document.getElementById(getSymbol(element)).className = "highlighted";
            document.getElementById(getSymbol(element)).setAttribute("ondrop", "drop(event)");
            document.getElementById(getSymbol(element)).setAttribute("ondragover", "allowDrop(event)");
        }
    }
}

function highlightOff(img) {
    img.parentElement.className = "field";
        let parentId = img.parentElement.id;
        let i, j = getNumbersFromSymbol(parentId)
        for (const element of moves) {
            document.getElementById(getSymbol(element)).className = "field";
            document.getElementById(getSymbol(element)).removeAttribute("ondrop");
            document.getElementById(getSymbol(element)).removeAttribute("ondragover");
        }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    lastField = ev.target.parentElement.id;
    ev.dataTransfer.setData("text", lastField);
}

function removeHighlightAfterMove(){
    for (const element of moves) {
        document.getElementById(getSymbol(element)).className = "field";
        document.getElementById(getSymbol(element)).removeAttribute("ondrop");
        document.getElementById(getSymbol(element)).removeAttribute("ondragover");
    }
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
    let thisFieldNumbers;
    if (ev.target.id){
        thisFieldNumbers = getNumbersFromSymbol(ev.target.id);
    } else {
        thisFieldNumbers = getNumbersFromSymbol(ev.target.parentNode.id)
    }
    let ii = thisFieldNumbers[0];
    let jj = thisFieldNumbers[1];
    Board[ii][jj].occupyingFigure.color = activePlayer;
    Board[ii][jj].occupyingFigure.type = type;
    updateKingsPosition(Board[ii][jj]);
    checkForPromotion(Board[ii][jj]);
    proceedToNextTurn();
}

function updateKingsPosition(field){
    if (field.occupyingFigure.type === 'king'){
        Kings[activePlayer] = [field.i, field.j];
    }
}

function checkForPromotion(field){
    if (field.j === getPromotionArea(activePlayer) && field.occupyingFigure.type === 'pawn'){
        field.occupyingFigure.type = 'queen';
    }
}

function proceedToNextTurn(){
    if (activePlayer === 'white') {activePlayer = 'black'}
    else {activePlayer = 'white'};
    removeHighlightAfterMove();
    BackupGameState();
    flipBoard();
    switchTimers();
    clearLastField();
}

function BackupGameState(){
    localStorage.setItem('Board', JSON.stringify(Board));
    updateBoard();
}

function clearLastField() {
    document.getElementById(lastField).className = "field";
    document.getElementById(lastField).removeAttribute("ondrop");
    document.getElementById(lastField).removeAttribute("ondragover");
}
