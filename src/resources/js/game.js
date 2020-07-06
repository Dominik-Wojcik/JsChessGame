function Player(color){
    this.color = color;
}

function FigureOnBoard(type, color){
    this.type = type;
    this.color = color;
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
            this.x = 8 - x;
            this.y = 8 - y;
        }
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

Board = [];
for (let i=1; i<9; i++){
    Board[i] = [];
}

Players = [];
Players.push(new Player('black'));
Players.push(new Player('white'));
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