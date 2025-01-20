const gameBoard = (function(){
  let size = 3;
  let board = [];

  //Create 2d array of arrays with for loop
  for (let i = 0; i < size; i++) {
    board[i] = [];
    for (let j = 0; j < size; j++) {
      //Populate each cell with the PlayerMark object
      board[i].push(PlayerMark());
    }
  }

  const getBoard = () => board;

  // console.log(result)
  // Iterates over the array's rows which are the board[0/1/2] with .map
  // Then continue iterating with the nested array
  // At the innermost cell, get access to the getValue function from PlayerMark object
  const printBoard = () => {
    const arrayValues = board.map((row) => row.map((cell)=>cell.getValue()))
    console.log(arrayValues)
  }

  return {getBoard, printBoard}
})()

function PlayerMark(){
  let value = 0;
  
  const addMark = (player) => {
    value = player;
  };

  const getValue = () => value;

  return { addMark, getValue }
}

const gameController = (function(){
  playerOneName = "Player One";
  playerTwoName = "Player Two";

  const board = gameBoard;

  const players = [
    {
      name : playerOneName,
      mark : "X"
    },
    {
      name : playerTwoName,
      mark : "Y"
    }
  ]

  let activePlayer =  players[0];

  const switchPlayerTurn = () => {
    if (activePlayer === players[0]) {
      activePlayer = players[1]
    }else{
      activePlayer = players[0]
    }
    console.log(activePlayer)
  }

  return { switchPlayerTurn }
})()

function checkWinCondition(board) {
  const checkRow = function(board){
    for (let row = 0; row < board.length; row++) {
      let isEqual = true;
      //Set the first value of the row to compare with
      value = board[row][0];
      for (let col = 0; col < board.length; col++) {
        if(value !== board[row][col]){
          isEqual = false;
          //If even one is false, skip to next row
          break
        }
      }
      if(isEqual){
        // console.log("FOUND EQUAL ROW")
        return true;
      }
    }
    return false
  }

  const checkCol = function(board){
    for (let col = 0; col < board.length; col++){
      let isEqual = true;
      //Set first value of the column to compare with
      let value = board[0][col];

      for (let row = 0; row <board.length; row++) {
        if(value !== board[row][col]){
          isEqual = false;
          //if even one is false, skip to next column
          break
        }
      }

      if(isEqual){
        // console.log("FOUND EQUAL COL")
        return true;
      }
    }
    return false;
  }


  const checkDiag = function(board){
    const value = board[1][1]
    let isEqual = true
    //Main diagonal (0.0, 1.1, 2.2)
    function checkMainDiag(board){
      for (let row = 0; row < board.length; row++) {
        if(value !== board[row][row]){
          isEqual = false
          break
        }
      }
      return isEqual
    }

    //Anti diagonal (0.2, 1.1, 2.0)
    function checkAntiDiag(board){
      for (let row = 0; row < board.length; row++) {
        if(value !== board[row][board.length - 1 - row]){
          isEqual = false
          break
        }
        
      }
      return isEqual
    }

    if(checkAntiDiag(board)){
      return true;
    }
    if(checkMainDiag(board)){
      return true;
    }

  }


  // if(checkRow(board)){
  //   return true
  // }

  if(checkRow(board)){
    console.log("Row Win")
  }else if(checkCol(board)){
    console.log("Col Win")
  }else if(checkDiag(board)){
    console.log("Diag Win")
  }else{
    console.log("Draw")
  }

}