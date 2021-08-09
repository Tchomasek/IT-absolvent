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
  x: number;
  y: number;
  setFirstTurned: React.Dispatch<
    React.SetStateAction<{
      value: number;
      coordX: number;
      coordY: number;
    } | null>
  >;
  firstTurned: { value: number; coordX: number; coordY: number } | null;
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
  if (
    args.firstTurned &&
    args.x === args.firstTurned.coordX &&
    args.y === args.firstTurned.coordY
  ) {
    return;
  }

  // if this is the first card, just remember it
  if (args.firstTurned === null) {
    //first value of firstTurned represents its value, second and third represents its coordinations
    args.setFirstTurned({
      value: args.grid[args.x][args.y].value,
      coordX: args.x,
      coordY: args.y,
    });
    args.setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row, xIndex: number) => {
        const newRow = row.map((card, yIndex) => {
          if (args.x === xIndex && args.y === yIndex) {
            return { value: card.value, turned: true, cat: card.cat };
          } else {
            return card;
          }
        });
        return newRow;
      });
      return newGrid;
    });
  } else {
    // if this is the second card, do the bussiness
    args.setGrid((prevGrid) => {
      const newGrid = prevGrid.map(
        (
          row: { value: number; turned: boolean; cat: string }[],
          xIndex: number
        ) => {
          const newRow = row.map((card, yIndex) => {
            if (args.x === xIndex && args.y === yIndex) {
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
    if (args.firstTurned.value === args.grid[args.x][args.y].value) {
      setTimeout(() => {
        args.setFirstTurned(null);
        args.setGrid((prevGrid) => {
          const newGrid = prevGrid.map((row, xIndex: number) => {
            const newRow = row.map((card, yIndex) => {
              if (
                (args.x === xIndex && args.y === yIndex) ||
                (args.firstTurned?.coordX === xIndex &&
                  args.firstTurned.coordY === yIndex)
              ) {
                return { value: 0, turned: true, cat: "" };
              } else {
                return card;
              }
            });
            return newRow;
          });
          return newGrid;
        });
      }, 500);
    } else {
      args.setTurnDisabled(true);
      args.setFirstTurned(null);
      // if two cards dont match, they stay revealed a bit longer
      setTimeout(() => {
        args.setGrid((prevGrid) => {
          const newGrid = prevGrid.map((row, xIndex: number) => {
            const newRow = row.map((card, yIndex) => {
              if (
                (args.x === xIndex && args.y === yIndex) ||
                (args.firstTurned?.coordX === xIndex &&
                  args.firstTurned.coordY === yIndex)
              ) {
                return { value: card.value, turned: false, cat: card.cat };
              } else {
                return card;
              }
            });
            return newRow;
          });
          return newGrid;
        });
        args.setTurnDisabled(false);
      }, 1500);
    }
  }
};

export const Pexeso = () => {
  const [grid, setGrid] = useState(startGrid);
  const [firstTurned, setFirstTurned] = useState(
    null as null | { value: number; coordX: number; coordY: number }
  );
  // this value will be false during those 1500 ms when two not-matching cards are turned, so the player cant turn another cards
  const [turnDisabled, setTurnDisabled] = useState(false);
  const board = grid.map((row, x) => (
    <tr key={"row_" + x}>
      {row.map((col, y) => {
        return (
          <Card
            key={x + "_" + y}
            handleClick={() =>
              clickHandler({
                grid,
                x,
                y,
                setFirstTurned,
                firstTurned,
                setGrid,
                turnDisabled,
                setTurnDisabled,
              })
            }
            value={grid[x][y].value}
            turned={grid[x][y].turned}
            cat={grid[x][y].cat}
          />
        );
      })}
    </tr>
  ));
  return (
    <>
      <Helmet>
        <title>Catxeso</title>
      </Helmet>
      <DivWrapper>
        <table>
          <tbody>{board}</tbody>
        </table>
      </DivWrapper>
    </>
  );
};
