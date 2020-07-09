window.onload = function () {
    document.getElementById("board").style.flexDirection = 'column';
    for (let i=1; i<11; i++) document.getElementById("row-" + i).style.flexDirection = 'row';
};

function flipBoard() {
    if (document.getElementById("board").style.flexDirection === 'column'){
        document.getElementById("board").style.flexDirection = 'column-reverse';
        invertRows();
    }else{
        document.getElementById("board").style.flexDirection = 'column';
        invertRows();
    }
}
