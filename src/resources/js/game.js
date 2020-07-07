function Player(color){
    this.color = color;
}

let Board = [];

function Field(){
    this.occupyingFigure = new FigureOnBoard('none', 'none');
}

for (let i=1; i<9; i++){
    Board[i] = [];
    for (let j=1; j<9; j++)
        Board[i][j] = new Field();
}

isOccupied = (field) => field.occupyingFigure.type !== 'none';
figuresPicture = (figure) => "<img src=\"/JsChessGame/src/resources/images/" + figure.color + "-" + figure.type + ".png\">"

function FigureOnBoard(type, color){
    this.type = type;
    this.color = color;
    this.availableMoves = function(Player) {
        switch (this.type) {
            case 'pawn': pawnMoves(Player);
            case 'rook': rookMoves(Player);
            case 'bishop': bishopMoves(Player);
        }
    }
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
    if (isOccupied(Board[i+1][j+direction])){
        if (Board[i+direction][j-1].occupyingFigure.color !== Player) moves.push(Board[i+direction][j-1]);
        }
        if (isOccupied(Board[i-1][j+direction]) ){
            if (Board[i+direction][j+1].occupyingFigure.color !== Player) moves.push(Board[i+direction][j+1]);
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


function Pawn(x, y, type){
    this.type = type;
    this.x = x;
    this.y = y;
    this.placeOnBoard = function (Player) {
        if (Player.color === 'white') {
            this.x = x;
            this.y = y;
        } else {
            this.x = x;
            this.y = 9 - y;
        }
        Board[this.x][this.y].occupyingFigure = new FigureOnBoard(this.type, Player.color);
    }
}

function addTwoCorrespondingFigures(variance, type){
    Figures.push(new Pawn(variance, 1, type));
    Figures.push(new Pawn(9-variance, 1, type));
}

function addSmallPawns(){
    for (let i = 1; i < 9; i++) {
        Figures.push(new Pawn(i, 2, 'pawn'));
    }
}

function buildFiguresArray() {
    addSmallPawns();
    addTwoCorrespondingFigures(1, 'rook');
    addTwoCorrespondingFigures(2, 'knight');
    addTwoCorrespondingFigures(3, 'bishop');
    Figures.push(new Pawn(4, 1, 'queen'));
    Figures.push(new Pawn(5, 1, 'king'));
}

Players = [];
Players.push(new Player('white'));
Players.push(new Player('black'));
Figures = [];

function initialSetup(){
    buildFiguresArray();
    for (Player of Players){
        for (figure of Figures){
            figure.placeOnBoard(Player);
        }
    }
}

initialSetup();
localStorage.setItem('Board', JSON.stringify(Board));

function updateBoard() {
    let Board = JSON.parse(localStorage.getItem('Board'));
    for (let i=1; i<9; i++){
        for (let j=1; j<9; j++){
            let id = String.fromCharCode(j+96) + i.toString();
            if (isOccupied(Board[i][j])) {
                document.getElementById(id).innerHTML = figuresPicture(Board[i][j].occupyingFigure);
            } else {
                document.getElementById(id).innerHTML = "";
            }
        }
    }
}

updateBoard();

