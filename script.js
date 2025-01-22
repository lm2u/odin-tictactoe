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

  // Iterates over the array's rows which are the board[0/1/2] with .map
  // Then continue iterating with the nested array
  // At the innermost cell, get access to the getValue function from PlayerMark object
  const printBoard = () => {
    const arrayValues = board.map((row) => row.map((cell)=>cell.getValue()))
    return arrayValues
  }


  const populateBoard = (row, col, mark) => {
      board[row][col].addMark(mark);
  }
  
  const isCellPopulated = (row, col) => {
    if (board[row][col].getValue() === 0) {
      return false;
    } else{
      return true
    }
  }
  

  return {isCellPopulated, getBoard, printBoard, populateBoard}
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
    // console.log("test", row,col);
    // console.log(activePlayer)
    // console.log(getActivePlayer().mark)
    // console.log(checkWinCondition(board.getBoard()))
    if (board.isCellPopulated(row,col)) {
      console.log("Choose another cell")
      return;
    }

    board.populateBoard(row, col, getActivePlayer().mark) ;

    const winBoard = board.printBoard()
    if(checkWinCondition(winBoard)){
      console.log(`Game End, ${getActivePlayer().name} won!`)
      return true
    }

    printNewRound();
    return null;
  }

  const printNewRound = () => {
    board.printBoard()
    console.log(`Now is ${getActivePlayer().name}'s turn`)
  }
  // printNewRound()

  return { playRound, switchPlayerTurn, getActivePlayer, getBoard: board.getBoard }
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


function screenController(){
  const game = gameController;
  const main = document.getElementById("main")
  const root = document.documentElement;
  const board = game.getBoard();

  function clickHandlerBoard(e) {
    const gameState = game.playRound(e.target.dataset.row, e.target.dataset.column);
    updateScreen(e);

    if (gameState === true) {
      console.log(`${game.getActivePlayer().name} has won the game!`);
      return; // Stop further execution if the game has ended
    }
  
    if (gameState === null) {
      // Switch to the next player only if the move was valid and the game continues
      game.switchPlayerTurn();
    }
  }
  
  function updateScreen(e){

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        const item = document.createElement("div");
        item.classList.add("item");
        item.dataset.column = j;
        item.dataset.row = i;
        main.appendChild(item)
      }
    }

    if (game.getActivePlayer().mark === "X") {
      e.target.style.background = "lime";
    }else{
      e.target.style.background = "white";
    }
    // console.log(e)
  };

  main.addEventListener("click", clickHandlerBoard);
  updateScreen()

}

screenController()