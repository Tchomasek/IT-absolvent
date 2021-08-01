import { Component } from "react";
import Square from "./Square";
import styled from "styled-components";

type State = {
  grid: string[][];
  nextTurn: string;
};

const Table = styled.table`
  text-align: "center",
  margin: "auto",
  height: "auto",
  width: "500px",
  display: "flex"
  `;

const DivWrapper = styled.div`
  display: "flex",
  margin: "auto",
  width: "40%",
  textAlign: "center",
  flexFlow: "column",
  `;

export default class TicTacToe extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      grid: Array(10)
        .fill(0)
        .map(() => Array(10).fill("")),
      nextTurn: "O",
    };
    this.handleClick = this.handleClick.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    this.setState({
      grid: Array(10)
        .fill(0)
        .map(() => Array(10).fill("")),
      nextTurn: "O",
    });
  }
  handleClick(i: number, j: number) {
    if (
      this.state.nextTurn === this.state.grid[i][j] ||
      this.state.grid[i][j] !== ""
    ) {
      return;
    } else {
      this.setState((prevState) => {
        const newGrid = prevState.grid.map((row, i_index) => {
          const newRow = row.map((square, j_index) => {
            if (i === i_index && j === j_index && square === "") {
              return this.state.nextTurn;
            } else {
              return square;
            }
          });
          return newRow;
        });
        return {
          nextTurn: prevState.nextTurn === "O" ? "X" : "O",
          grid: newGrid,
        };
      });
    }
    const g = this.state.grid;
    // flip clicked square manualy, because this.state.grid returned old, not updated grid
    g[i][j] = this.state.nextTurn;

    function checkDir(x_: number, y_: number, color: string) {
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
    const x_horizontal = checkDir(0, 1, "X") + checkDir(0, -1, "X") - 1;
    const o_horizontal = checkDir(0, 1, "O") + checkDir(0, -1, "O") - 1;

    const x_vertical = checkDir(1, 0, "X") + checkDir(-1, 0, "X") - 1;
    const o_vertical = checkDir(1, 0, "O") + checkDir(-1, 0, "O") - 1;

    const x_diag1 = checkDir(1, 1, "X") + checkDir(-1, -1, "X") - 1;
    const o_diag1 = checkDir(1, 1, "O") + checkDir(-1, -1, "O") - 1;

    const x_diag2 = checkDir(1, 1, "X") + checkDir(-1, -1, "X") - 1;
    const o_diag2 = checkDir(-1, 1, "O") + checkDir(1, -1, "O") - 1;

    //check to see if there are any sums greater than or equal to 5 and alert the players of a win
    //setTimeout is called so that the alert() function does not hold up the rendering of the board.
    if (x_horizontal >= 5 || x_vertical >= 5 || x_diag1 >= 5 || x_diag2 >= 5) {
      setTimeout(() => {
        const x = confirm("X wins");
        if (x === true) {
          this.reset();
        }
      }, 1);
    }

    if (o_horizontal >= 5 || o_vertical >= 5 || o_diag1 >= 5 || o_diag2 >= 5) {
      setTimeout(() => {
        const x = confirm("O wins");
        if (x === true) {
          this.reset();
        }
      }, 1);
    }
  }

  render() {
    console.time("a");
    const board = this.state.grid.map((row, i) => {
      return (
        <tr key={"row_" + i}>
          {row.map((col, j) => {
            return (
              <Square
                handleClick={() => this.handleClick(i, j)}
                key={i + "_" + j}
                value={this.state.grid[i][j]}
              />
            );
          })}
        </tr>
      );
    });
    return (
      <DivWrapper
        style={{
          display: "flex",
          margin: "auto",
          width: "40%",
          textAlign: "center",
          flexFlow: "column",
        }}
      >
        <Table cellSpacing="0">
          <tbody>{board}</tbody>
        </Table>
        <button onClick={this.reset}>Reset</button>
        <br />
      </DivWrapper>
    );
  }
}
console.timeEnd("a");
