let boxes = document.querySelectorAll(".box")
let resetbtn = document.querySelector(".reset")

let winmsg = document.querySelector(".win-msg")
let msg = document.querySelector("#msg")

let turn = "playX";

let winpattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        
        if(turn==="playx") {
            turn = "playo";
            box.innerText = "X";   
        }
        else {
            turn = "playx";
            box.innerText = "O";
        }
        box.disabled = true;
       
        checkwinner();
    });
});
const showWinner = (winner) => {
    msg.innerText = `${winner} is the winner`;
    winmsg.classList.remove("hide");
    
}
const showDraw = (draw) => {
    msg.innerText = `It's a Draw!`;
    winmsg.classList.remove("hide");
}
const checkdraw =  () =>{
    for(let box of boxes) {
        if(box.innerText === "") {
            return false;
        }
    }
    return true;
}
const checkwinner = () => {
    for(let pattern of winpattern ) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if(pos1 != "" && pos2 != "" && pos3 != "") {
            if(pos1 === pos2 && pos2 === pos3) {
                boxes[pattern[0]].style.backgroundColor = "lightgreen";
                boxes[pattern[1]].style.backgroundColor = "lightgreen";
                boxes[pattern[2]].style.backgroundColor = "lightgreen";
                boxes.forEach((box) => box.disabled = true);
                console.log(pos1 + " is the winner");
                showWinner(pos1);
            }
        }
        if(checkdraw()) {
            showDraw();
            boxes.forEach((box) => box.disabled = true);
            console.log("It's a Draw");
            
        }

    }
    
}

const resetbut = () => {
    turn = "playX";
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
        box.style.backgroundColor = "rgb(230, 196, 151)";
        winmsg.classList.add("hide");

    })

}
resetbtn.addEventListener("click", resetbut); 
