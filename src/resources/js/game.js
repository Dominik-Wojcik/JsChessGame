function Player(color){
    this.color = color;
}

function Pawn(x, y, type){
    let placeOnBoard = function (Player) {
        if (Player.color === 'white') {
            this.x = x;
            this.y = y;
        } else {
            this.x = 8 - x;
            this.y = 8 - y;
        }
        this.color = Player.color;
    }
}

function addTwoCorrespondingFigures(variance, type){
    Figures.add(new Pawn(variance, 1, type));
    Figures.add(new Pawn(9-variance, 1, type));
}

function addSmallPawns(){
    for (let i = 1; i < 9; i++) {
        Figures.add(new Pawn(i, 2, smallPawn));
    }
}

Players = [];
Players.add(new Player(black));
Players.add(new Player(white));

Figures = [];

function buildFiguresArray() {
    addSmallPawns();
    addTwoCorrespondingFigures(1, 'tower');
    addTwoCorrespondingFigures(2, 'knight');
    addTwoCorrespondingFigures(3, 'messenger');
    Figures.add(new Pawn(4, 1, 'queen'));
    Figures.add(new Pawn(5, 1, 'king'));
}


function initialSetup(){
    buildFiguresArray();
    for (Player of Players){
        for (Figure of Figures){
            Figure.placeOnBoard(Player);
        }
    }
}
