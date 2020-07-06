function Player(color){
    this.color = color;
}

function Pawn(x, y, type){
    placeOnBoard = function (Player) {
        if (Player.color === 'white'){
            this.x = x;
            this.y = y;
        } else {
            this.x = 8-x;
            this.y = 8-y;
        }
    }
}

Players = [];
Players.add(new Player(black));
Players.add(new Player(white));

Figures = [];

function initialSetup(){
    for (Player of Players){
        for (Figure of Figures){
            Figure.placeOnBoard(Player);
        }
    }
}
