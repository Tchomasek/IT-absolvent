import { useState } from "react";
import Card from "./Card";
import MyArray from "./cardsArray";
import shuffle from "./shuffle";
import styled from "styled-components";

const GRID_SIZE = 4;

const DivWrapper = styled.div`
  display: flex;
  margin: auto;
  text-align: center;
  flex-flow: column;
  justify-content: center;
`;

function createGrid() {
  const shuffledArray = shuffle(MyArray);
  return Array.from({ length: GRID_SIZE }).map(() =>
    Array.from({ length: GRID_SIZE }, () => shuffledArray.pop())
  );
}
const startGrid = createGrid();

function clickHandler(
  grid, // : [{ value: number; turned: boolean; cat: string }]  ???
  i: number,
  j: number,
  setFirstTurned: (grid) => void,
  firstTurned: null | number[],
  setGrid, // (i, j) => [{ value: number; turned: boolean; cat: string }] ???
  turnDisabled: boolean,
  setTurnDisabled: (arg0: boolean) => void
) {
  if (turnDisabled) {
    // is two not matching cards are turned, for 1500ms no other card can be turned
    return;
  }
  // clicking on the same spot twice does nothing
  if (firstTurned) {
    if (i === firstTurned[1] && j === firstTurned[2]) {
      return;
    }
  }
  // if this is the first card, just remember it
  if (!firstTurned) {
    //first value of firstTurned represents its value, second and third represents its coordinations
    setFirstTurned([grid[i][j].value, i, j]);
    setGrid([...grid], (grid[i][j].turned = true));
  } else {
    // if this is the second card, do the bussiness
    setGrid([...grid], (grid[i][j].turned = true));
    // if two matching cards are turned, remove them
    if (firstTurned[0] === grid[i][j].value) {
      setTimeout(() => {
        setFirstTurned(null);
        setGrid(
          [...grid],
          //remove two matching cards
          (grid[firstTurned[1]][firstTurned[2]] = { value: "", turned: true }),
          (grid[i][j] = { value: "", turned: true })
        );
      }, 500);
    } else {
      setTurnDisabled(true);
      setFirstTurned(null);
      // if two cards dont match, they stay revealed a bit longer
      setTimeout(() => {
        setGrid(
          [...grid],
          (grid[firstTurned[1]][firstTurned[2]].turned = false)
        );
        setGrid([...grid], (grid[i][j].turned = false));
        setTurnDisabled(false);
      }, 1500);
    }
  }
}

export default function Pexeso() {
  const [grid, setGrid] = useState(startGrid);
  const [firstTurned, setFirstTurned] = useState(null);
  // this value will be false during those 1500 ms when two not-matching cards are turned, so the player cant turn another cards
  const [turnDisabled, setTurnDisabled] = useState(false);
  const board = grid.map((row, i) => {
    return (
      <tr key={"row_" + i}>
        {row.map((col, j) => {
          return (
            <Card
              key={i + "_" + j}
              handleClick={() =>
                clickHandler(
                  grid,
                  i,
                  j,
                  setFirstTurned,
                  firstTurned,
                  setGrid,
                  turnDisabled,
                  setTurnDisabled
                )
              }
              value={grid[i][j].value}
              turned={grid[i][j].turned}
              cat={grid[i][j].cat}
            />
          );
        })}
      </tr>
    );
  });

  return (
    <DivWrapper>
      <table>
        <tbody>{board}</tbody>
      </table>
    </DivWrapper>
  );
}
