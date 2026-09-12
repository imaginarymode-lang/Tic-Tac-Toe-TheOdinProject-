const player1Name = document.querySelector("#player1Name");
const player2Name = document.querySelector("#player2Name");
const startGame = document.querySelector("#startGame");
const setupMessage = document.querySelector(".setup-message");
const board = document.querySelector(".board");
const setupArea = document.querySelector(".setup");
const result = document.querySelector(".result");
const reset = document.querySelector(".Reset");

function setup() {
    setupMessage.textContent = "";
    if (player1Name.value.trim() === "" || player2Name.value.trim() === "") {
        setupMessage.textContent = "Please enter both player names.";
    return false;
}
return true;
}
startGame.addEventListener("click", () => {
    if (!setup()) {
        return;
    }
    gameBoard.resetBoard();
    
    player1 = createPlayer(player1Name.value, "X");
    player2 = createPlayer(player2Name.value, "O");
    currentPlayer = player1;
    gameOver = false;

    setupArea.classList.add("hidden");
    board.classList.remove("hidden");
    reset.classList.remove("hidden");
    
    enableBoard();
    render();
    startTurn();
});


const squares = document.querySelectorAll(".square");

squares.forEach((square) => {
    square.addEventListener("click", (event) => {
    const position = Number(event.target.dataset.position);
    makeMove(position);
   });
});




const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "",""];
    
    function getBoard() {
        return board;
    }
    function placeMarker(position, marker) {
        if  (board[position] === "") {
            board[position] = marker;
            return true;
        } else {
            return false;
        }
    }
    
    function resetBoard() { 
    board = ["", "", "", "", "", "", "", "",""];
    }
    
    return {
        getBoard,
        placeMarker,
        resetBoard
    };

}) ();


// factory function
const createPlayer = (name, symbol) =>  {
    return { 
        name,
        symbol
    };
};


let player1;
let player2;
let currentPlayer;



let gameOver = false;

function startTurn() {
    turn.textContent = `It is now ${currentPlayer.name}'s turn to move.`; 
}
function switchTurn() {
if (currentPlayer === player1) {
    currentPlayer = player2;
} else {
    currentPlayer = player1;
}
    startTurn();
}

function makeMove(position) {
    if (gameOver) {
        return;
    }
    let successful = gameBoard.placeMarker(position, currentPlayer.symbol);
    
    if (successful) {
        render();
        if (checkWinner()) {    
            endGame(`${currentPlayer.name} wins!`);
            
        } else if (checkTie()) {
            endGame(`It's a tie!`);
        } else {
           switchTurn();
        }   
 
    }
}
function render() {
    squares.forEach((square, index) => {
        square.textContent = gameBoard.getBoard()[index];      
    });
}
const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function checkWinner() {
return winningCombination.some(winningLine => winningLine.every(position => gameBoard.getBoard()[position] === currentPlayer.symbol))
};
function checkTie() {
    return gameBoard.getBoard().every(value => value !== "");
}
const turn = document.querySelector(".turn");

function resetGame() {
    if (!player1 || !player2) {
        return;
    }
result.textContent = "";
setupMessage.textContent = "";

gameBoard.resetBoard();
currentPlayer = player1;
gameOver = false;

render();
enableBoard();

startTurn();
}
function disableBoard() {
    squares.forEach((square) => {
        square.disabled = true;
    });
}
function enableBoard() {
    squares.forEach((square) => {
        square.disabled = false;
});
}
function endGame(message) {
    gameOver = true;
    result.textContent = message;
    disableBoard();
    turn.textContent = "";
}
reset.addEventListener("click", () => {
    resetGame();
});
render();
