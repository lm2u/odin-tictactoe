function checkWinCondition (board) {
  console.log(board);
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
