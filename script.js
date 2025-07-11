restartBtn = document.querySelector("button.restart");
choosePlayer = document.querySelector("button.usernames");
const btn = document.querySelectorAll("button.item");
const intro = document.querySelector(".gameOutcome");
let player = 0; 
let endOfGame = 0;

User();
const pick = Gameboard();

function Gameboard() {

  // Private variables
  const rows = 3;
  const columns = 3;
  const board = []; 

  // Create 3x3 grid
  function grid() {
  for (let i = 0; i < rows; i++) {
    board[i] = [] 
    for (let j = 0; j < columns; j++) {
      board[i].push("Y");
    }
  }
  }
  grid();

  // Add option for custom player names
  let playerOne = "";
  let playerTwo = "";
  choosePlayer.addEventListener("click", function () {
    playerOne = prompt("Player 1 name:");
    playerTwo = prompt("Player 2 name:");
    if (playerOne == null) {
      playerOne = "";
    }
    if (playerTwo == null){
      playerTwo = "";
    }
  });

  return function dropToken(cellOne, cellTwo, button) {

    // Restart game
    restartBtn.addEventListener("click", function () {
      button.textContent = "";
      player = 0;
      grid(); 
      endOfGame = 0;
      intro.textContent = "";
      playerOne = "";
      playerTwo = "";
    });

    // If user gives wrong input
    if (cellOne < 1 || cellTwo < 1 || cellOne > 3 || cellTwo > 3) {
      return
    }

    // Change input to arrays
    cellOneArray = cellOne - 1;
    cellTwoArray = cellTwo - 1;
    let index = board.indexOf(board[cellOneArray])

    // If cell is already filled
    if (board[index][cellTwoArray] == "X" || board[index][cellTwoArray] == "O") {
      return
    }

    // Check for player turn
    myPlayer();
    let currentPlayer; 
    if (player == 1) {
      currentPlayer = 1
      board[index][cellTwoArray] = "X";
      button.textContent = "X";
    }
    else {
      currentPlayer = 2;
      board[index][cellTwoArray] = "O";
      button.textContent = "O";
    }

    const allEqual = arr => arr.every(val => val === arr[0]);

    // Check for columns
    function secondDimension() {
      let columnNumber = [];
      for (let k = 0; k < 3; k++) {
        columnNumber.push(board[k][cellTwoArray]);
      }
      return columnNumber;
    }

    const columnNumberValue = secondDimension();

    // Check win conditions
    function winCons() {
      if (allEqual(board[index]) == true || allEqual(columnNumberValue) == true
      || board[0][0] == "X" && board[1][1] == "X" && board[2][2] == "X"
      || board[0][2] == "X" && board[1][1] == "X" && board[2][0] == "X"
      || board[0][0] == "O" && board[1][1] == "O" && board[2][2] == "O"
      || board[0][2] == "O" && board[1][1] == "O" && board[2][0] == "O")
      {
        if (playerOne == "" || playerTwo == "") {
          intro.textContent = " PLAYER " + currentPlayer + " WINS";
        }
        else {
          if (player == 1) {
            intro.textContent = `${playerOne} WINS`;
          }
          else {
            intro.textContent = `${playerTwo} WINS`;
          }
        }
        endOfGame = 1;
      }
      else {
        drawCheck(board);
      }
    }

    winCons();
    return board;
  }
}


// Check for draws
function drawCheck(boardCheck) {
  let storeMyValue = [];
  for (let l = 0; l < 3; l++) {
    boardCheck[l].filter(function(letter) {
      if (letter != "Y" === true) {
        storeMyValue.push(letter);
      }
    });
  }
  if (storeMyValue.length == 9) {
    intro.textContent = " ITS A DRAW";
    endOfGame = 1;
    return storeMyValue;
  }
}


function myPlayer() {
  if (player == 0) {
    player++
  }
  else {
    player = 0;
  }
}

// User function for DOM elements
function User() {
  let row = 1;
  let column = 0;


  for (let i = 0; i < 9; i++) {

    column++;
    btn[i].id = "r" + row + "c" + column;

    if (column > 2) {
      row++;
      column = 0;
    } 
  }

  btn.forEach((button) => {
    
    function handleClick() { 

      // Stop user interaction if game is over
      if (endOfGame == 1) {
        alert("Click on restart if you want to play again.")
        return;
      }
      array1 = [];
      array2 = [];
      buttonId = button.getAttribute('id');
      array1 = buttonId[1];
      array2 = buttonId[3]; 
      pick(array1, array2, button);
            
    }
    button.addEventListener("click", handleClick); 
  }); 
}    