const bishopDirections = [[1, 1], [-1, 1], [-1, -1], [1, -1]];
const rookDirections = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const knightDirections = [[2, 1], [1, 2], [-1, -2], [-2, -1], [2, -1], [-2, 1], [-1, 2], [1, -2]];
const royalDirections = [[1, 1], [-1, 1], [-1, -1], [1, -1], [1, 0], [-1, 0], [0, 1],[0, -1]];
const whiteStart = 1;
const blackStart = 8;
const whiteDirection = 1;
const blackDirection = -1;

function checkMovesInDirections(directions, Player, i, j){
    let moves = [];
    for (const direction of directions){
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

function checkStepInDirection(directions, Player, i, j){
    let moves = [];
    for (const direction of directions){
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

function knightMoves(Player, i, j){
    return checkStepInDirection(knightDirections, Player, i, j);
}

function rookMoves(Player, i, j){
    return checkMovesInDirections(rookDirections, Player, i, j);
}

function bishopMoves(Player, i, j){
    return checkMovesInDirections(bishopDirections, Player, i, j);
}

function queenMoves(Player, i, j){
    return checkMovesInDirections(royalDirections, Player, i, j);
}

function pawnMoves(Player, i, j){
    let moves = [];
    let start;
    let direction;
    let opColor;
    if (Player === 'white'){
        start = whiteStart;
        direction = whiteDirection;
        opColor = 'black';
    } else {
        start = blackStart;
        direction = blackDirection;
        opColor = 'white';
    }
    if (!isOccupied(Board[i][j+direction])){
        moves.push(Board[i][j+direction]);
        if (j === start+direction && !isOccupied(Board[i][j+2*direction])){
            moves.push(Board[i][j+2*direction]);
        }
    }
    if (i+1 < 9 && Board[i+1][j+direction].occupyingFigure.color === opColor) moves.push(Board[i+1][j+direction]);
    if (i-1 > 0 && Board[i-1][j+direction].occupyingFigure.color === opColor) moves.push(Board[i-1][j+direction]);
    return moves;
}

function kingMoves(Player, i, j){
    return checkStepInDirection(royalDirections, Player, i , j).filter(function(field){
                                                        !isChecked(Player, field.i, field.j)
    }).concat(castlingCheck(Player));
}

function castlingCheck(Player){
    let moves = [];
    if (Player === 'white') {
    const start = whiteStart
    }else{const start  = blackStart};
    if (Board[5][start].occupyingFigure.type === 'king' && Board[5][start].occupyingFigure.color === Player){
        if (isChecked(Player, 5, start)) return moves;
        if (Board[1][start].occupyingFigure.type === 'rook' && Board[1][start].occupyingFigure.color === Player){
            if (Board[2][start].type === 'none' && Board[3][start].type === 'none' && Board[4][start].type === 'none') {
                if (!isChecked(Player, 4, start) && !isChecked(Player, 3, start)) moves.push(Board[3][start]);
            }
        }
        if (Board[8][start].occupyingFigure.type === 'rook' && Board[8][start].occupyingFigure.color === Player){
            if (Board[6][start].type === 'none' && Board[7][start].type === 'none'){
                if (!isChecked(Player, 6, start) && !isChecked(Player, 7, start)) moves.push(Board[7][start]);
            }
        }
    }
    return moves;
}

function isCheckedFromDirection(directions, Player, i, j, figure){
    for (const direction of directions) {
        let ii = i + direction[0];
        let jj = j + direction[1];
        while (ii > 0 && jj > 0 && ii < 9 && jj < 9) {
            if (Board[ii][jj].occupyingFigure.color === Player) {
                break;
            } else if (Board[ii][jj].occupyingFigure.color === op) {
                if (Board[ii][jj].occupyingFigure.type === 'queen' ||
                    Board[ii][jj].occupyingFigure.type === figure) {
                    return true;
                } else break;
            }
            ii += direction[0];
            jj += direction[1];
        }
    }
    return false;
}

function isChecked(Player, i, j){
    if (Player === 'white') {
        const op = 'black';
        const opDirection = blackDirection;
    }
    else {
        const op = 'white';
        const opDirection = whiteDirection;
    }

    if (isCheckedFromDirection(bishopDirections, Player, i, j, 'bishop')) return true;
    if (isCheckedFromDirection(rookDirections, Player, i, j, 'rook')) return true;

    for (const direction of knightDirections){
        if (i+direction[0] < 9 && i+direction[0] > 0 && j+direction[1] > 0 && j+direction[1] < 9 &&
            Board[i+direction[0]][j+direction[1]].occupyingFigure.type === 'knight' &&
            Board[i+direction[0]][j+direction[1]].occupyingFigure.color === op) return true;
    }

    for (const direction of [[-1, opDirection], [1, opDirection]]){
            if (Board[i+direction[0]][j+direction[1]].occupyingFigure.type === 'pawn' &&
                Board[i+direction[0]][j+direction[1]].occupyingFigure.color === op){
                return true
            }
        }

    return false;
}


