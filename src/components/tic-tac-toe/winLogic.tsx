// winLogic was heavily inspired by code from this web page: https://briancaffey.github.io/2017/10/03/simple-games-in-react.html/

function winLogic(
  grid: ("O" | "X" | null)[][],
  x: number,
  y: number,
  nextTurn: "O" | "X",
  cellsToWin: number
) {
  // flip clicked square manualy, because this.state.grid returned old, not updated grid
  const currentGrid = [...grid];
  currentGrid[x][y] = nextTurn;

  // run checkWin function
  return checkWin(currentGrid, x, y, cellsToWin);
}

function checkDirection(
  grid: ("O" | "X" | null)[][],
  x_: -1 | 0 | 1,
  y_: -1 | 0 | 1,
  color: "X" | "O",
  x: number,
  y: number
): number {
  //track how many squares of a given color there are in a given dirention (specified by x_ and y_)
  //for example checkDirection(0,1, 'w') checks how many white stones there are in a row to the right )
  let tracked = 0;
  let _x = x;
  let _y = y;
  //stop tracking stones when the color is not equal to the specified stone or we have gone past the edge of the board
  while (grid[_x] !== undefined && grid[_x][_y] === color) {
    //increment the number of tracked stones
    tracked += 1;
    //increment/decrement to check the next square in the specified direction
    _y += y_;
    _x += x_;
  }
  return tracked;
}

//sum the directions (left+right, up+down, 2 diagonals)
function checkWin(
  grid: ("O" | "X" | null)[][],
  x: number,
  y: number,
  cellsToWin: number
) {
  let conditions = { win: false, player: "" };
  const x_horizontal =
    checkDirection(grid, 0, 1, "X", x, y) +
    checkDirection(grid, 0, -1, "X", x, y) -
    1;
  const o_horizontal =
    checkDirection(grid, 0, 1, "O", x, y) +
    checkDirection(grid, 0, -1, "O", x, y) -
    1;

  const x_vertical =
    checkDirection(grid, 1, 0, "X", x, y) +
    checkDirection(grid, -1, 0, "X", x, y) -
    1;
  const o_vertical =
    checkDirection(grid, 1, 0, "O", x, y) +
    checkDirection(grid, -1, 0, "O", x, y) -
    1;

  const x_diag1 =
    checkDirection(grid, 1, 1, "X", x, y) +
    checkDirection(grid, -1, -1, "X", x, y) -
    1;
  const o_diag1 =
    checkDirection(grid, 1, 1, "O", x, y) +
    checkDirection(grid, -1, -1, "O", x, y) -
    1;

  const x_diag2 =
    checkDirection(grid, -1, 1, "X", x, y) +
    checkDirection(grid, 1, -1, "X", x, y) -
    1;
  const o_diag2 =
    checkDirection(grid, -1, 1, "O", x, y) +
    checkDirection(grid, 1, -1, "O", x, y) -
    1;

  //check to see if there are any sums greater than or equal to 5 and alert the players of a win
  //setTimeout is called so that the confirm() function does not hold up the rendering of the board.
  // 'X' player part
  if (
    x_horizontal >= cellsToWin ||
    x_vertical >= cellsToWin ||
    x_diag1 >= cellsToWin ||
    x_diag2 >= cellsToWin
  ) {
    conditions.win = true;
    conditions.player = "X";
  }
  // 'O' player part
  if (
    o_horizontal >= cellsToWin ||
    o_vertical >= cellsToWin ||
    o_diag1 >= cellsToWin ||
    o_diag2 >= cellsToWin
  ) {
    conditions.win = true;
    conditions.player = "O";
  }
  return conditions;
}

export default winLogic;
