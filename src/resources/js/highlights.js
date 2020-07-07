function highlightOn(img) {
    img.parentElement.style.background = "green";
    let parentId = img.parentElement.id;
    parentId = parentId.split("");
    let j = parentId[0].charCodeAt(0) - 96;
    let i = parentId[1];
    console.log(i, j);
    for (let b = j; b < j+2; b++){
    console.log(b);
        let id = String.fromCharCode(b+96) + i.toString();
        document.getElementById(id).style.background = "green";
    }
}

function highlightOff(img) {
    img.parentElement.removeAttribute("style");
        let parentId = img.parentElement.id;
        parentId = parentId.split("");
        let j = parentId[0].charCodeAt(0) - 96;
        let i = parentId[1];
        console.log(i, j);
        for (let b = j; b < j+2; b++){
        console.log(b);
            let id = String.fromCharCode(b+96) + i.toString();
            document.getElementById(id).removeAttribute("style");
        }
}
