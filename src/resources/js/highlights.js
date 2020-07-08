function highlightOn(img) {
    img.parentElement.className = "highlighted";
    let parentId = img.parentElement.id;
    parentId = parentId.split("");
    let j = parentId[0].charCodeAt(0) - 96;
    let i = parentId[1];
    console.log(i, j);
    console.log(Board[i][j]);
    let moves;
    let figure = Board[i][j].occupyingFigure;
    switch(figure.type) {
        case "rook":
            moves = rookMoves("white", i, j);
            break;
        case "pawn":
            moves = pawnMoves("white", i, j);
            break;
        case "bishop":
            moves = bishopMoves("white", i, j);
            break;
        case "queen":
            moves = queenMoves("white", i, j);
            break;
        case "knight":
            moves = knightMoves("white", i, j);
            break;
    }
    console.log(moves);
    for (element of moves) {
        console.log(element);

    }
//    for (let b = j; b < j+2; b++){
//        let id = String.fromCharCode(b+96) + i.toString();
//        document.getElementById(id).className = "highlighted";
//    }
}

function highlightOff(img) {
    img.parentElement.className = "field";
        let parentId = img.parentElement.id;
        parentId = parentId.split("");
        let j = parentId[0].charCodeAt(0) - 96;
        let i = parentId[1];
        for (let b = j; b < j+2; b++){
            let id = String.fromCharCode(b+96) + i.toString();
            document.getElementById(id).className = "field";
        }
}
