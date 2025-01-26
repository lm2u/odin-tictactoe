// GameBoard module
// Manages the state of the board
// Handles board manipulation
// Uses IIFE to encapsulate and have private variables

function PlayerMark(){
  let value = 0;

  const addMark = (player) => {
    value = player
  }

  const getValue = () => value;

  return {addMark, getValue}
}

const GameBoard = (function(){
  const size = 3;
  let board = [];

  // Create the board
  // Array of fixed size 3x3
  // In each element, append PlayerMark's object
  for (let row = 0; row < size; row++) {
    //Create empty list, every 3 element
    board[row] = [];
    for (let col = 0; col < size; col++) {
      board[row].push(PlayerMark())
    }
    
  }

  const getBoard = () => board;

  //Access each row, to access each item(col).
  //Since each item is a factory function, we can use the getValue method.
  //The values will then become the content of the item.
  const printBoard = () =>{
    const arrayValues = board.map((row) => row.map((col)=>col.getValue()))
    // console.log(arrayValues)
    return arrayValues;
  }

  //Access PlayerMark factory in each item to use addMark method.
  const populateBoard = (row, col, mark) =>{
    board[row][col].addMark(mark);
  }
  
  //If value is not 0, means it has been replaced with Mark
  //If there is a mark already, it returns true.
  const isCellPopulated = (row, col) => {
    return board[row][col].getValue() !== 0 
  }

  return {getBoard, printBoard, populateBoard, isCellPopulated}
})()

const board = GameBoard;

const GameController = (function(){
  const board = GameBoard;
  const playerOneName = "Player One";
  const playerTwoName = "Player Two";

  const players = [
    {
      name : playerOneName,
      mark : "X"
    },
    {
      name : playerTwoName,
      mark : "O"
    }
  ]

  //Player switch logic
  //Switches active player by checking
  //If current player is equal to player[0], then switch. works the other way.
  let activePlayer = players[0];
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }
  const getActivePlayer = () => activePlayer;

  //Main logic per round
  const playRound = (row, col) => {
    
    //First check if cell is empty, then allow them to play round again.
    if(board.isCellPopulated(row, col)){
      console.log("Choose another cell")
      return 
    }

    //Populate the array with the current player's mark
    //See if win condition has been achieved then log msg
    board.populateBoard(row, col, getActivePlayer().mark)
    if (checkWinCondition(board.printBoard())) {
      console.log(`Game end! The winner is ${getActivePlayer().name}`)
      return true
    }

    printNewRound()

    return null
  }

  const printNewRound = () => {
    board.printBoard()
    console.log(`Switching Turns. Now is ${getActivePlayer().name}'s turn`)
  }

  return {switchPlayerTurn, getActivePlayer, playRound, printNewRound}
})()


function ScreenController(){
  const game = GameController;
  const board = GameBoard.getBoard();
  const main = document.getElementById("main");
  const playerTurn = document.getElementById("playerTurn")
  console.log(main)

  //Generate fixed grid board based on length of board
  //Add the corresponding properties for locating and styles
  function updatePlayerTurn(isEnd){
    playerTurn.textContent = `${game.getActivePlayer().name}'s turn`;
    if (isEnd) {
      playerTurn.textContent =`${game.getActivePlayer().name} has won the game!` ;
    }
  }


  function generateBoardGrid(){
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board.length; col++) {
        const item = document.createElement("div")
        item.classList.add("item")
        item.dataset.row = row
        item.dataset.col = col
        main.appendChild(item)
      }
    }
  }

  //Update the style of the clicked element
  function updateElement(e){
    if(game.getActivePlayer().mark === "X"){
      e.target.style.backgroundImage = "url('./images/X.svg')";
    }else{
      e.target.style.backgroundImage = "url('./images/O.svg')";
    }
  }

  //Click element where on click, it will execute playround
  //Access the dataset property of each element,
  //Then pass it on as parameters
  //After every click, update the style of the clicked element
  function clickHandlerBoard(e){
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;

    //Prevent player from clicking same element twice.
    if (!GameBoard.isCellPopulated(row,col)) {
      updateElement(e);
    }
    
    const gameState = game.playRound(row,col)
    
    if(gameState === true){
      console.log("Game End")
      console.log(`${game.getActivePlayer().name} Won!`)
      updatePlayerTurn(gameState);
      main.removeEventListener("click", clickHandlerBoard)
      return
    }
    
    if(gameState === null){
      game.switchPlayerTurn();
      updatePlayerTurn();
    }
  }

  main.addEventListener("click", clickHandlerBoard)
  updatePlayerTurn();
  generateBoardGrid()
}

ScreenController()