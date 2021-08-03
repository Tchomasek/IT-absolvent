import { Component } from "react";
import Square from "./Square";
import styled from "styled-components";
import winLogic from "./winLogic";

const GRID_SIZE = 10;

type State = {
  grid: ("O" | "X" | null)[][];
  nextTurn: "O" | "X";
  cellsToWin: number;
};

const DivWrapper = styled.div`
  display: flex;
  margin: auto;
  text-align: center;
  flex-flow: column;
  justify-content: center;
`;

const InputCellsToWin = styled.input`
  width: 30px;
  text-align: center;
`;

const CellsToWinWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

function createGrid() {
  return Array.from({ length: GRID_SIZE }).map(() =>
    Array.from({ length: GRID_SIZE }, () => null)
  );
}

export default class TicTacToe extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      grid: createGrid(),
      nextTurn: "O",
      cellsToWin: 5,
    };
    this.handleClick = this.handleClick.bind(this);
    this.reset = this.reset.bind(this);
    this.changeCellsToWin = this.changeCellsToWin.bind(this);
  }
  changeCellsToWin(e) {
    this.setState({ cellsToWin: e.target.value });
  }

  reset() {
    this.setState({
      grid: createGrid(),
      nextTurn: "O",
    });
  }

  handleClick(i: number, j: number) {
    // check if the clicked cell is empty
    if (
      this.state.nextTurn === this.state.grid[i][j] ||
      this.state.grid[i][j] !== null
    ) {
      return;
    } else {
      this.setState((prevState) => {
        const newGrid = prevState.grid.map((row, i_index) => {
          const newRow = row.map((square, j_index) => {
            if (i === i_index && j === j_index && square === null) {
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
      // winLogic returns false and empty string if nobody won in this turn, or true and color of the player that won
      const { win, player } = winLogic(
        this.state.grid,
        i,
        j,
        this.state.nextTurn,
        this.state.cellsToWin
      );
      // if a player won, alert window will pop-up and player gets to choose if he wants to reset the board by clicking Ok
      if (win) {
        // without 1ms timeout, the confirm window would be displayed immediately and the last symbol would not get rendered
        setTimeout(() => {
          const x = confirm(player + " wins");
          if (x === true) {
            this.reset();
          }
        }, 1);
      }
    }
  }

  render() {
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
      <DivWrapper>
        <CellsToWinWrapper>
          Cells to win:
          <InputCellsToWin
            type="number"
            value={this.state.cellsToWin}
            onChange={this.changeCellsToWin}
          />
        </CellsToWinWrapper>
        <table cellSpacing="0">
          <tbody>{board}</tbody>
        </table>
        <button onClick={this.reset}>Reset</button>
        <br />
      </DivWrapper>
    );
  }
}
