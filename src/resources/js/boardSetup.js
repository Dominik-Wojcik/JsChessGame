function Player(color){
    this.color = color;
}

let Board = [];
isOccupied = (field) => field.occupyingFigure.type !== 'none';
figuresPicture = (figure) => "<img src=\"/JsChessGame/src/resources/images/" + figure.color + "-" + figure.type + ".png\">"

function Field(i, j){
    this.i=i;
    this.j=j;
    this.occupyingFigure = new FigureOnBoard('none', 'none');
}

for (let i=1; i<9; i++){
    Board[i] = [];
    for (let j=1; j<9; j++)
        Board[i][j] = new Field(i,j);
}

function FigureOnBoard(type, color){
    this.type = type;
    this.color = color;
    this.availableMoves = function(Player) {
        switch (this.type) {
            case 'pawn': pawnMoves(Player);
            case 'rook': rookMoves(Player);
            case 'bishop': bishopMoves(Player);
            case 'queen': queenMoves(Player);
            case 'knight': knightMoves(Player);
            case 'king': kingMoves(Player);
        }
    }
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
    Figures.push(new Pawn(5, 1, 'queen'));
    Figures.push(new Pawn(4, 1, 'king'));
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
            let id = String.fromCharCode(i+96) + j.toString();
            if (isOccupied(Board[i][j])) {
                document.getElementById(id).innerHTML = figuresPicture(Board[i][j].occupyingFigure);
            } else {
                document.getElementById(id).innerHTML = "";
            }
        }
    }
}

updateBoard();