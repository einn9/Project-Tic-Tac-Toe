console.log("hello");


function Gameboard() {

  // Private variables
  const rows = 3;
  const columns = 3;
  const board = []; 

  let counter = 0; 


  // Create 3x3 grid
  for (let i = 0; i < rows; i++) {
    board[i] = [] 
    for (let j = 0; j < columns; j++) {
      board[i].push("Y");
    }
  }

  return function dropToken(cellOne, cellTwo) {

    // If user gives wrong input
    if (cellOne < 1 || cellTwo < 1 || cellOne > 3 || cellTwo > 3) {
      console.log("please pick again");
      return
    }

    // Change input to arrays
    cellOneArray = cellOne - 1;
    cellTwoArray = cellTwo - 1;

    function myPlayer(input) {
      if (counter == 0) {
        console.log("this case");
        counter++
        return input + 1;
      }
      else {
        console.log("now its 1");
        counter = 0;
        return input + 2;
      }
    }

    let index = board.indexOf(board[cellOneArray])

    // If cell is already filled
    if (board[index][cellTwoArray] == "X" || board[index][cellTwoArray] == "O") {
      console.log("please pick again");
      return
    }

    // Check for player turn
    let playerTurn = 0;
    let player = myPlayer(playerTurn);

    if (player == 1) {
      board[index][cellTwoArray] = "X";
    }
    else {
      board[index][cellTwoArray] = "O";
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

    function winCons() {
      if (allEqual(board[index]) == true || allEqual(columnNumberValue) == true
      || board[0][0] == "X" && board[1][1] == "X" && board[2][2] == "X"
      || board[0][2] == "X" && board[1][1] == "X" && board[2][0] == "X"
      || board[0][0] == "O" && board[1][1] == "O" && board[2][2] == "O"
      || board[0][0] == "O" && board[1][1] == "O" && board[2][2] == "O")
      {
      console.log("PLAYER " + player + " WINS");
      }
    }

    winCons();
    drawCheck(board);
    return board;
  }
}


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
    console.log("ITS A DRAW");
    return storeMyValue;
  }
}
const pick = Gameboard();

