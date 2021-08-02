import { Component } from "react";
import Square from "./Square";
import styled from "styled-components";
import winLogic from "./winLogic";

type State = {
  grid: string[][];
  nextTurn: "O" | "X";
};

const DivWrapper = styled.div`
  display: flex;
  margin: auto;
  text-align: center;
  flex-flow: column;
`;

export default class TicTacToe extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      grid: Array.from({ length: 10 }).map(() =>
        Array.from({ length: 10 }, () => "")
      ),
      nextTurn: "O",
    };
    this.handleClick = this.handleClick.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    this.setState({
      grid: Array.from({ length: 10 }).map(() =>
        Array.from({ length: 10 }, () => "")
      ),
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
    winLogic(this.state.grid, i, j, this.state.nextTurn, this.reset);
  }

  render() {
    const board = this.state.grid.map((row, i) => {
      return (
        <tr key={"row_" + i}>
          {row.map((col, j) => {
            // console.time();
            return (
              <Square
                handleClick={() => this.handleClick(i, j)}
                key={i + "_" + j}
                value={this.state.grid[i][j]}
              />
            );
            // console.timeEnd();
          })}
        </tr>
      );
    });
    return (
      <DivWrapper>
        <table cellSpacing="0">
          <tbody>{board}</tbody>
        </table>
        <button onClick={this.reset}>Reset</button>
        <br />
      </DivWrapper>
    );
  }
}
