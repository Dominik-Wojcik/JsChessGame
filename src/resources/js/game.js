function Player(color){
    this.color = color;
}

let Board = [];
for (let i=1; i<9; i++){
    Board[i] = [];
}

function FigureOnBoard(type, color){
    this.type = type;
    this.color = color;
    this.availableMoves = function(Player) {

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
            this.x = 9 - x;
            this.y = 9 - y;
        }
        Board[this.x][this.y] = new Array();
        Board[this.x][this.y].push(new FigureOnBoard(this.type, Player.color));
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
            if (Board[i][j] !== null) {
                let id = String.fromCharCode(j+96) + i.toString();
                let picture = "<img src=\"/JsChessGame/src/resources/images/" + Board[i][j][0].color + "-" + Board[i][j][0].type + ".png\">";
                document.getElementById(id).innerHTML = picture;
            } else {

            }
        }
    }
}

updateBoard();

