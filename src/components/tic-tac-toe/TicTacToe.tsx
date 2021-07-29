import React, { Component } from "react";
import Square from "./Square";
import styled from "styled-components";

type State = {
  grid: string[][];
  nextTurn: string;
};

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
    this.changeNextTurn = this.changeNextTurn.bind(this);
  }

  changeNextTurn() {
    this.setState((prevState) => {
      const nextTurn = prevState.nextTurn === "O" ? "X" : "O";
      return { nextTurn: nextTurn };
    });
  }

  handleClick(i, j) {
    this.changeNextTurn();
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
        ...prevState,
        grid: newGrid,
      };
    });
  }

  render() {
    const Table = styled.table`
    textAlign: "center",
    margin: "auto",
    height: "auto",
    width: "500px",
    border: "1px solid black",
    tableLayout: "fixed",
  `;
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
      <div style={{ textAlign: "center" }}>
        <div style={{ margin: "auto", width: "40%" }}>
          <Table cellSpacing="0">
            <tbody>{board}</tbody>
          </Table>
        </div>
        <br />
      </div>
    );
  }
}
