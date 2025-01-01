const gameBoard = (function(){
  // let board = [
  //   [1,2,3],
  //   [4,5,6],
  //   [7,3,9]
  // ]
  let board = [
    [1,2,3],
    [4,5,6],
    [7,3,9]
  ]

  console.log(board)
  result = checkWinCondition(board)
  // console.log(result)
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



  function takeInput(row, col, marker){
    board[row][col] = marker
  }

  return {board, takeInput}
})()


  // //Predefined win conditions
  // if((board[0][0] == board[0][1] && board[0][0] == board[0][2]) ||
  //   (board[0][0] == board[1][0] && board[0][0] == board[2][0]) ||
  //   (board[0][0] == board[1][1] && board[0][0] == board[2][2]) ||

  //   (board[0][2] == board[1][1] && board[0][2] == board[2][0]) ||
  //   (board[0][2] == board[1][2] && board[0][2] == board[2][2]) ||

  //   (board[1][0] == board[1][1] && board[1][0] == board[1][2]) ||
  //   (board[2][0] == board[2][1] && board[2][0] == board[2][2]) ||
  //   (board[0][1] == board[1][1] && board[0][1] == board[2][1])){
  //     console.log(true)
  //     console.log(board)
  //   }