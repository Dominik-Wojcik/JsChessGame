function knightMoves(Player, i, j){
    let moves = [];
    let directions = [[2, 1], [1, 2], [-1, -2], [-2, -1], [2, -1], [-2, 1], [-1, 2], [1, -2]];
    for (direction of directions){
        let ii = i + direction[0];
        let jj = j + direction[1];
        if (ii > 0 && jj > 0 && ii < 9 && jj < 9){
            if (Board[ii][jj].occupyingFigure.color !== Player){
                moves.push(Board[ii][jj]);
            }
        }
    }
    return moves;
}

function pawnMoves(Player, i, j){
    let moves = [];
    let start = 1;
    let direction = 1;
    if (Player!=='white'){
        start += 7;
        direction *= -1;
    }
    if (!isOccupied(Board[i][j+direction])){
        moves.push(Board[i][j+direction]);
        if (j === start+direction && !isOccupied(Board[i][j+2*direction])){
            moves.push(Board[i][j+2*direction]);
        }
    }
    if (i+1 < 9 && isOccupied(Board[i+1][j+direction])){
        if (Board[i+1][j+direction].occupyingFigure.color !== Player) moves.push(Board[i+1][j+direction]);
    }
    if (i-1 > 0 && isOccupied(Board[i-1][j+direction])){
        if (Board[i-1][j+direction].occupyingFigure.color !== Player) moves.push(Board[i-1][j+direction]);
    }
    return moves;
}

function rookMoves(Player, i, j){
    let moves = [];
    let directions = [[1, 0], [-1, 0], [0, 1],[0, -1]];
    for (direction of directions){
        let ii = i + direction[0];
        let jj = j + direction[1];
        while (ii > 0 && jj > 0 && ii < 9 && jj < 9){
            if (Board[ii][jj].occupyingFigure.type === 'none'){
                moves.push(Board[ii][jj]);
            }   else if (Board[ii][jj].occupyingFigure.color !== Player) {
                moves.push(Board[ii][jj]);
                break;
            }   else {
                break;
            }
            ii += direction[0];
            jj += direction[1];
        }
    }
    return moves;
}

function bishopMoves(Player, i, j){
    let moves = [];
    let directions = [[1, 1], [-1, 1], [-1, -1], [1, -1]];
    for (direction of directions){
        let ii = i + direction[0];
        let jj = j + direction[1];
        while (ii > 0 && jj > 0 && ii < 9 && jj < 9){
            if (Board[ii][jj].occupyingFigure.type === 'none'){
                moves.push(Board[ii][jj]);
            }   else if (Board[ii][jj].occupyingFigure.color !== Player) {
                moves.push(Board[ii][jj]);
                break;
            }   else {
                break;
            }
            ii += direction[0];
            jj += direction[1];
        }
    }
    return moves;
}

function queenMoves(Player, i, j){
    let moves = [];
    let directions = [[1, 1], [-1, 1], [-1, -1], [1, -1], [1, 0], [-1, 0], [0, 1],[0, -1]];
    for (direction of directions){
        let ii = i + direction[0];
        let jj = j + direction[1];
        while (ii > 0 && jj > 0 && ii < 9 && jj < 9){
            if (Board[ii][jj].occupyingFigure.type === 'none'){
                moves.push(Board[ii][jj]);
            }   else if (Board[ii][jj].occupyingFigure.color !== Player) {
                moves.push(Board[ii][jj]);
                break;
            }   else {
                break;
            }
            ii += direction[0];
            jj += direction[1];
        }
    }
    return moves;
}

function kingMoves(Player, i, j){
    let moves = [];
    let directions = [[1, 1], [-1, 1], [-1, -1], [1, -1], [1, 0], [-1, 0], [0, 1],[0, -1]];
    for (let direction of directions){
        if (!isChecked(Player, i+direction[0], j+direction[1]) && Board[i+direction[0]][j+direction[1]].occupyingFigure.color !== Player){
            moves.push(Board[i+direction[0]][j+direction[1]]);
        }
    }
    return moves;
}

function isChecked(Player, i, j){
    if (Player === 'white') {
        let op = 'black';
        let opDirection = -1;
    }
    else {
        let op = 'white';
        let opDirection = 1;
    }

    for (let direction of [[1, 1], [-1, 1], [-1, -1], [1, -1]]) {
        let ii = i + direction[0];
        let jj = j + direction[1];
        while (ii > 0 && jj > 0 && ii < 9 && jj < 9) {
            if (Board[ii][jj].occupyingFigure.color === Player) {
                break;
            } else if (Board[ii][jj].occupyingFigure.color === op) {
                if (Board[ii][jj].occupyingFigure.type === 'queen' ||
                    Board[ii][jj].occupyingFigure.type === 'bishop') {
                    return true;
                } else break;
            }
            ii += direction[0];
            jj += direction[1];
        }
    }

    for (let direction of  [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        let ii = i + direction[0];
        let jj = j + direction[1];
        while (ii > 0 && jj > 0 && ii < 9 && jj < 9) {
            if (Board[ii][jj].occupyingFigure.color === Player) {
                break;
            } else if (Board[ii][jj].occupyingFigure.color === op) {
                if (Board[ii][jj].occupyingFigure.type === 'queen' ||
                    Board[ii][jj].occupyingFigure.type === 'rook') {
                    return true;
                } else break;
            }
            ii += direction[0];
            jj += direction[1];
        }
    }

    for (let direction of [[2, 1], [1, 2], [-1, -2], [-2, -1], [2, -1], [-2, 1], [-1, 2], [1, -2]]){
        if (i+direction[0] < 9 && i+direction[0] > 0 && j+direction[1] > 0 && j+direction[1] < 9 &&
            Board[i+direction[0]][j+direction[1]].occupyingFigure.type === 'knight' &&
            Board[i+direction[0]][j+direction[1]].occupyingFigure.color === op) return true;
    }

    for (let direction of [[-1, opDirection],[1, opDirection]]){
            if (Board[i+direction[0]][j+direction[1]].occupyingFigure.type === 'pawn' &&
                Board[i+direction[0]][j+direction[1]].occupyingFigure.color === op){
                return true
            }
        }

    return false;
}


