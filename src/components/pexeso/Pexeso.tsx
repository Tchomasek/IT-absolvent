import { Helmet } from "react-helmet";
import { doubledArray } from "./cardsArray";
import { shuffle } from "./shuffle";
import { useState } from "react";
import Card from "./Card";
import styled from "styled-components";

const GRID_SIZE = 4;

const DivWrapper = styled.div`
  display: flex;
  margin: auto;
  text-align: center;
  flex-flow: column;
  justify-content: center;
`;

const createGrid = () => {
  const shuffledArray = shuffle(doubledArray);
  return Array.from({ length: GRID_SIZE }).map(() =>
    Array.from({ length: GRID_SIZE }, () => shuffledArray.pop())
  );
};
const startGrid = createGrid();

type Grid = { value: number; turned: boolean; cat: string }[][];

type ClickHandlerArg = {
  grid: Grid;
  i: number;
  j: number;
  setFirstTurned: (array: number[] | null) => void;
  firstTurned: number[] | null;
  setGrid: React.Dispatch<React.SetStateAction<Grid>>;
  turnDisabled: boolean;
  setTurnDisabled: (turnDisabled: boolean) => void;
};

const clickHandler = (args: ClickHandlerArg) => {
  if (args.turnDisabled) {
    // if two not matching cards are turned, for 1500ms no other card can be turned
    return;
  }
  // clicking on the same spot twice does nothing
  if (args.firstTurned) {
    if (args.i === args.firstTurned[1] && args.j === args.firstTurned[2]) {
      return;
    }
  }
  // if this is the first card, just remember it
  if (args.firstTurned === null) {
    //first value of firstTurned represents its value, second and third represents its coordinations
    args.setFirstTurned([args.grid[args.i][args.j].value, args.i, args.j]);
    args.setGrid((prevGrid) => {
      const newGrid = prevGrid.map(
        (
          row: { value: number; turned: boolean; cat: string }[],
          i_index: number
        ) => {
          const newRow = row.map((card, j_index) => {
            if (args.i === i_index && args.j === j_index) {
              return { value: card.value, turned: true, cat: card.cat };
            } else {
              return card;
            }
          });
          return newRow;
        }
      );
      return newGrid;
    });
  } else {
    // if this is the second card, do the bussiness
    args.setGrid((prevGrid) => {
      const newGrid = prevGrid.map(
        (
          row: { value: number; turned: boolean; cat: string }[],
          i_index: number
        ) => {
          const newRow = row.map((card, j_index) => {
            if (args.i === i_index && args.j === j_index) {
              return { value: card.value, turned: true, cat: card.cat };
            } else {
              return card;
            }
          });
          return newRow;
        }
      );
      return newGrid;
    });
    // if two matching cards are turned, remove them
    if (args.firstTurned[0] === args.grid[args.i][args.j].value) {
      setTimeout(() => {
        args.setFirstTurned(null);
        args.setGrid((prevGrid) => {
          const newGrid = prevGrid.map(
            (
              row: { value: number; turned: boolean; cat: string }[],
              i_index: number
            ) => {
              const newRow = row.map((card, j_index) => {
                if (
                  (args.i === i_index && args.j === j_index) ||
                  (args.firstTurned?.[1] === i_index &&
                    args.firstTurned[2] === j_index)
                ) {
                  return { value: 0, turned: true, cat: "" };
                } else {
                  return card;
                }
              });
              return newRow;
            }
          );
          return newGrid;
        });
      }, 500);
    } else {
      args.setTurnDisabled(true);
      args.setFirstTurned(null);
      // if two cards dont match, they stay revealed a bit longer
      setTimeout(() => {
        args.setGrid((prevGrid) => {
          const newGrid = prevGrid.map(
            (
              row: { value: number; turned: boolean; cat: string }[],
              i_index: number
            ) => {
              const newRow = row.map((card, j_index) => {
                if (
                  (args.i === i_index && args.j === j_index) ||
                  (args.firstTurned?.[1] === i_index &&
                    args.firstTurned[2] === j_index)
                ) {
                  return { value: card.value, turned: false, cat: card.cat };
                } else {
                  return card;
                }
              });
              return newRow;
            }
          );
          return newGrid;
        });
        args.setTurnDisabled(false);
      }, 1500);
    }
  }
};

export default function Pexeso() {
  const [grid, setGrid] = useState(startGrid);
  const [firstTurned, setFirstTurned] = useState(null as null | number[]);
  // this value will be false during those 1500 ms when two not-matching cards are turned, so the player cant turn another cards
  const [turnDisabled, setTurnDisabled] = useState(false);
  const board = grid.map((row, i) => {
    return (
      <>
        <Helmet>
          <title>Catxeso</title>
        </Helmet>
        <tr key={"row_" + i}>
          {row.map((col, j) => {
            return (
              <Card
                key={i + "_" + j}
                handleClick={() =>
                  clickHandler({
                    grid,
                    i,
                    j,
                    setFirstTurned,
                    firstTurned,
                    setGrid,
                    turnDisabled,
                    setTurnDisabled,
                  })
                }
                value={grid[i][j].value}
                turned={grid[i][j].turned}
                cat={grid[i][j].cat}
              />
            );
          })}
        </tr>
      </>
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
