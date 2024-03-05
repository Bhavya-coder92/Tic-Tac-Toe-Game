const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGamebtn = document.querySelector(".btn");

let currentPlayer; //Default player Joki X hai
let gameGrid; //Default Grid Joki empty hai
const winnigPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


//Let's create the function to intialize the game

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //UI par bhi empty krn hoga
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        boxes[index].classList.remove("win");
    });
    newGamebtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();


function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer ="O"
    }else{
        currentPlayer = "X"
    }
    // UI update
    gameInfo.innerText = gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
function checkGameOver(){

    let answer = "";
    winnigPosition.forEach((position) => {
        //All 3 boxes should be non-empty and exactly same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && 
        (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])){

            //Check if winner is X
            if(gameGrid[position[0]] === "X"){
                answer = "X";
            }else{
                answer = "O";
            }
            //Disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //Now we know X/O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");



        }
    });
 //It means we have a winner
    if(answer !== ""){
          gameInfo.innerText = `Winner Player - ${answer}`;
          newGamebtn.classList.add("active");
          return;
    }

    //Let's check whether there is tie
   let fillCount = 0;
   gameGrid.forEach((box) =>{
    if(box != ""){
        fillCount++;
    }
   } );

   //Board if filled, game is Tie
   if(fillCount === 9){
     gameInfo.innerText = "Game Tied !";
     newGamebtn.classList.add("active");
   }
 
    





}


function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].computedStyleMap.pointerEvents = "none";
        // Swap karo turn ko
        swapTurn();
        // Win Check
        checkGameOver();
    }
}

boxes.forEach((box,index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGamebtn.addEventListener("click",initGame);

