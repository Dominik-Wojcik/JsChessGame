function Player(color){
    this.color = color;
}

Players = [];
Players.add(new Player(black));
Players.add(new Player(white));

Figures = [];

function initialSetup(){
    for (Player of Players){
        for (Figure of Figures){
            Figure.placeOnBoard();
        }
    }
}
