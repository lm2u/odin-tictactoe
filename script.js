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

  const getBoardState = () => {
    const arrayValues = board.map((row) => row.map((cell)=>cell.getValue()))
    return arrayValues
  }

  const populateBoard = (row, col, mark) => {
      board[row][col].addMark(mark);
  }
  
  const isCellPopulated = (row, col) => {
    if (board[row][col].getValue() === 0) {
      return true;
    } else{
      return false
    }
  }
  

  return {isCellPopulated, getBoard, printBoard, populateBoard, getBoardState}
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
  }

  const getActivePlayer = () => activePlayer;
  const playRound = (row,col) => {
    // console.log(activePlayer)
    // console.log(getActivePlayer().mark)
    // console.log(checkWinCondition(board.getBoard()))
    if (board.isCellPopulated(row, col)) {
      board.populateBoard(row, col, getActivePlayer().mark) ;
      let winBoard = board.getBoardState()
      if(!checkWinCondition(winBoard)){
        switchPlayerTurn();                                  
        printNewRound();                                   
      }else{
        console.log(`Game End, ${getActivePlayer().name} won!`)
      }

      // console.log(checkWinCondition(status))
    }else{
      console.log("Choose another cell")
    }
  }

  const printNewRound = () => {
    board.printBoard()
    console.log(`Now is ${getActivePlayer().name}'s turn`)
  }
  printNewRound()

  return { playRound, switchPlayerTurn }
})()


function checkWinCondition(board) {
  const checkZero = (value) => value === 0;

  const checkRow = function(board){
    for (let row = 0; row < board.length; row++) {
      let isEqual = true;
      //Set the first value of the row to compare with
      value = board[row][0];
      if(checkZero(value)) continue;
      for (let col = 0; col < board.length; col++) {
        if(value !== board[row][col]){
          isEqual = false;
          //If even one is false, skip to next row
          break
        }
      }
      // console.log(isZero)
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
      if(checkZero(value)) continue;
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
    if(checkZero(value)) return false;
  
    let isMainDiagEqual = true;
    let isAntiDiagEqual = true;

    //Main diagonal (0.0, 1.1, 2.2)
    for (let row = 0; row < board.length; row++) {
      if(value !== board[row][row]){
        isMainDiagEqual = false
        break
      }
    }

    //Anti diagonal (0.2, 1.1, 2.0)
    for (let row = 0; row < board.length; row++) {
      if(value !== board[row][board.length - 1 - row]){
        isAntiDiagEqual = false
        break
      }
    }
        
    // return !hasZero && (isMainDiagEqual || isAntiDiagEqual);
    return (isMainDiagEqual || isAntiDiagEqual);

  };

  const rowWin = checkRow(board);
  const colWin = checkCol(board);
  const diagWin = checkDiag(board);

  if (rowWin) {
    console.log("Row");
  } else if (colWin) {
    console.log("Col");
  } else if (diagWin) {
    console.log("Diag");
  } else {
    console.log("Draw");
  }
  
  return rowWin || colWin || diagWin;

}
    // function checkZero(num){
    //   zeros.push(num)
    //   const allEqual = zeros.every(cell => cell === 0)
    //   // console.log(allEqual)
    // }
      // zeros.push(board[row][board.length - 1 - row])
      // if (zeros.includes(0)) {
      //   hasZero = true;
      // }