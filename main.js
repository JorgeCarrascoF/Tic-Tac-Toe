const cells = document.getElementsByClassName('cell');

const playerOneInput = document.getElementById('player1');
const playerTwoInput = document.getElementById('player2');

const namePlayerOne = document.getElementById('namePlayer1');
const namePlayerTwo = document.getElementById('namePlayer2');

const nameWinner = document.getElementById('winner');

const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('reset');
const gameboardScreen = document.getElementById('gameboard');

const startScreen = document.getElementById('startScreen');
const endScreen = document.getElementById('endScreen');

let player1;
let player2;
let currentPlayer;
let winner;
let movCounter = 0;

const Gameboard = (()=> {
    let gameboardArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    const markCell = (cell, marker) => {
        gameboardArray[cell] = marker;
    }

    const cellValue = (cell) => {
        return gameboardArray[cell];
    }

    return {cellValue, markCell, showArray};
})()

const playerFactory = (name, marker) => {

    const getName = () => name;
    const getMarker = () => marker;

    return {getName, getMarker}
}


const gameControl = (()=>{
    const gameOverControl = () => {

        // Check if 3 cells are equal
        let gameOver = false;

        if (Gameboard.cellValue(0) == Gameboard.cellValue(1) && Gameboard.cellValue(1) == Gameboard.cellValue(2) && Gameboard.cellValue(0) != 0) {
            console.log('fila 1');
            gameOver = true;
        } else if (Gameboard.cellValue(3) == Gameboard.cellValue(4) && Gameboard.cellValue(4) == Gameboard.cellValue(5) && Gameboard.cellValue(3) != 0) {
            console.log('fila 2');
            gameOver = true;
        } else if (Gameboard.cellValue(6) == Gameboard.cellValue(7) && Gameboard.cellValue(7) == Gameboard.cellValue(8) && Gameboard.cellValue(6) != 0) {
            console.log('fila 3');
            gameOver = true;
        } else if (Gameboard.cellValue(0) == Gameboard.cellValue(3) && Gameboard.cellValue(3) == Gameboard.cellValue(6) && Gameboard.cellValue(0) != 0) {
            console.log('columna 1');
            gameOver = true;
        } else if(Gameboard.cellValue(1) == Gameboard.cellValue(4) && Gameboard.cellValue(4) == Gameboard.cellValue(7) && Gameboard.cellValue(1) != 0) {
            console.log('columna 2');        
            gameOver = true;
        } else if(Gameboard.cellValue(2) == Gameboard.cellValue(5) && Gameboard.cellValue(5) == Gameboard.cellValue(8) && Gameboard.cellValue(2) != 0) {
            console.log('columna 3');        
            gameOver = true;
        } else if (Gameboard.cellValue(0) == Gameboard.cellValue(4) && Gameboard.cellValue(4) == Gameboard.cellValue(8) && Gameboard.cellValue(0) != 0){
            console.log('diagonal principal')
            gameOver = true;
        } else if (Gameboard.cellValue(2) == Gameboard.cellValue(4) && Gameboard.cellValue(4) == Gameboard.cellValue(6) && Gameboard.cellValue(2) != 0) {
            console.log('diagonal segundaria')
            gameOver = true;
        }

        winner = currentPlayer;
        return gameOver;
    }

    const checkCell = (e) =>{
        if (Gameboard.cellValue(e.target.id) == 0) {
            console.log(currentPlayer.getMarker());
            let id;
            if(currentPlayer.getMarker() == 'X') {
                id = e.target.id + 'X';
            } else{
                id = e.target.id + 'O';
            }
            document.getElementById(id).style.display = 'block';
            gameControl.markCell(e.target.id, currentPlayer.getMarker());
        };
    }

    const markCell = (cell, marker) => {
        Gameboard.markCell(cell, marker);
        movCounter++;

        if(gameOverControl()){
            endGameWinner();
        } else if (movCounter == 9) {
            endGameTie();
        } else {   
            if(currentPlayer.getMarker() == player1.getMarker()){
                currentPlayer = player2;
            } else {
                currentPlayer = player1;
            }
        }
    }

    const startGame = () => {
        player1 = playerFactory(playerOneInput.value, 'X');
        player2 = playerFactory(playerTwoInput.value, 'O');
        

        startScreen.style.display = 'none';
        gameboardScreen.style.pointerEvents = 'auto';
        
        namePlayerOne.innerText = player1.getName() + ' (X) ';
        namePlayerTwo.innerText = player2.getName() + ' (O) ';
        currentPlayer = player1;
    }

    const endGameWinner = () => {
        nameWinner.innerText = currentPlayer.getName();
        endScreen.style.display = 'inherit';
        gameboardScreen.style.pointerEvents = 'none';
    }
    
    const endGameTie = () => {
        nameWinner.innerText = `It's a tie!`;
        endScreen.style.display = 'inherit';
        gameboardScreen.style.pointerEvents = 'none';    
    }

    const resetGame = () => {
        namePlayerOne.innerText = '';
        namePlayerTwo.innerText = '';
        winner.innerText = '';
        movCounter = 0;

        for(i = 0; i < 9; i++){
            Gameboard.markCell(i, 0);
            document.getElementById(i + 'X').style.display = 'none';
            document.getElementById(i + 'O').style.display = 'none';
        }
        
        endScreen.style.display = 'none';
        startScreen.style.display = 'inherit';
    }


    return {checkCell, markCell, startGame, endGameWinner, endGameTie, resetGame}
})()

let i = 0;

for (cell of cells){
    cell.id = i;
    cell.addEventListener('click', gameControl.checkCell);
    i++;
}

startButton.addEventListener('click', gameControl.startGame)
resetButton.addEventListener('click', gameControl.resetGame)