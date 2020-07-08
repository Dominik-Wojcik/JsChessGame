let moves;

function highlightOn(img) {
    img.parentElement.className = "highlighted";
    let parentId = img.parentElement.id;
    parentId = parentId.split("");
    let j = parentId[0].charCodeAt(0) - 96;
    let i = parseInt(parentId[1]);
    console.log(i, j);
    console.log(Board[i][j]);
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
    }
}

function highlightOff(img) {
    img.parentElement.className = "field";
        let parentId = img.parentElement.id;
        parentId = parentId.split("");
        let j = parentId[0].charCodeAt(0) - 96;
        let i = parentId[1];
//        for (let b = j; b < j+2; b++){
//            let id = String.fromCharCode(b+96) + i.toString();
//            document.getElementById(id).className = "field";
        for (element of moves) {
            document.getElementById(getSymbol(element)).className = "field";
        }
}
