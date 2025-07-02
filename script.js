console.log("hello");


function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];
  let counter = 0;  

  for (let i = 0; i < rows; i++) {
    board[i] = [] 
    for (let j = 0; j < columns; j++) {
      board[i].push("Y");
    }
  }

  return function dropToken(cellOne, cellTwo) {
    if (cellOne < 1 || cellTwo < 1 || cellOne > 3 || cellTwo > 3) {
      console.log("please pick again");
      return
    }

    cellOneArray = cellOne - 1;
    cellTwoArray = cellTwo - 1;

    function myPlayer(input) {
      console.log("my player function running");
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
    console.log("heres the value", board[index][cellTwoArray]);
    if (board[index][cellTwoArray] == "X" || board[index][cellTwoArray] == "O") {
      console.log("please pick again");
      return
    }

    let playerTurn = 0;
    let player = myPlayer(playerTurn);

    if (player == 1) {
      board[index][cellTwoArray] = "X";
    }
    else {
      board[index][cellTwoArray] = "O";
    }

    return board;
  }
}


const pick = Gameboard();