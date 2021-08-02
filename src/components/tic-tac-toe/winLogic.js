function winLogic(g, i, j, nextTurn, reset) {
  // flip clicked square manualy, because this.state.grid returned old, not updated grid
  g[i][j] = nextTurn;

  function checkDir(x_, y_, color) {
    //track how many squares of a given color there are in a given dirention (specified by x_ and y_)
    //for example checkDir(0,1, 'w') checks how many white stones there are in a row to the right )
    let tracked = 0;
    let _x = i;
    let _y = j;
    //stop tracking stones when the color is not equal to the specified stone or we have gone past the edge of the board
    while (g[_x] !== undefined && g[_x][_y] === color) {
      //increment the number of tracked stones
      tracked += 1;
      //increment/decrement to check the next square in the specified direction
      _y += y_;
      _x += x_;
    }
    return tracked;
  }

  //sum the directions (left+right, up+down, 2 diagonals)
  function checkWin() {
    const x_horizontal = checkDir(0, 1, "X") + checkDir(0, -1, "X") - 1;
    const o_horizontal = checkDir(0, 1, "O") + checkDir(0, -1, "O") - 1;

    const x_vertical = checkDir(1, 0, "X") + checkDir(-1, 0, "X") - 1;
    const o_vertical = checkDir(1, 0, "O") + checkDir(-1, 0, "O") - 1;

    const x_diag1 = checkDir(1, 1, "X") + checkDir(-1, -1, "X") - 1;
    const o_diag1 = checkDir(1, 1, "O") + checkDir(-1, -1, "O") - 1;

    const x_diag2 = checkDir(1, 1, "X") + checkDir(-1, -1, "X") - 1;
    const o_diag2 = checkDir(-1, 1, "O") + checkDir(1, -1, "O") - 1;

    //check to see if there are any sums greater than or equal to 5 and alert the players of a win
    //setTimeout is called so that the confirm() function does not hold up the rendering of the board.

    // 'X' player part
    if (x_horizontal >= 5 || x_vertical >= 5 || x_diag1 >= 5 || x_diag2 >= 5) {
      setTimeout(() => {
        const x = confirm("X wins");
        if (x === true) {
          reset();
        }
      }, 1);
    }

    // 'O' player part
    if (o_horizontal >= 5 || o_vertical >= 5 || o_diag1 >= 5 || o_diag2 >= 5) {
      setTimeout(() => {
        const x = confirm("O wins");
        if (x === true) {
          reset();
        }
      }, 1);
    }
  }

  // run checkWin function
  checkWin();
}

export default winLogic;
