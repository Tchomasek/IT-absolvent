import { Helmet } from "react-helmet";
import { connect, useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";
import styled from "styled-components";

const ADD1 = "ADD1" as const;
const ADD2 = "ADD2" as const;
const SUBSTRACT1 = "SUBSTRACT1" as const;
const SUBSTRACT2 = "SUBSTRACT2" as const;
const POWER2 = "POWER2" as const;
const POWERSELF = "POWERSELF" as const;
const DIVIDEBY2 = "DIVIDEBY2" as const;
const SQRT = "SQRT" as const;
const CLEAR = "CLEAR" as const;

const DIVISION_SYMBOL = "\u00F7" as const;
const SQUARE_ROOT_SYMBOL = "\u221A" as const;

const reducer = (state = 0, action: { type: string }) => {
  switch (action.type) {
    case ADD1:
      return state + 1;
    case ADD2:
      return state + 2;
    case SUBSTRACT1:
      return state + -1;
    case SUBSTRACT2:
      return state + -2;
    case POWER2:
      return Math.pow(state, 2);
    case POWERSELF:
      return Math.pow(state, state);
    case DIVIDEBY2:
      return state / 2;
    case SQRT:
      if (state < 0) {
        alert("Nobody likes imaginary numbers!");
        return Math.sqrt(Math.abs(state));
      }
      return Math.sqrt(state);
    case CLEAR:
      return 0;
    default:
      return state;
  }
};

export const store = createStore(reducer);

const buttonFunctions = () => ({
  add1: () => ({ type: ADD1 }),
  add2: () => ({ type: ADD2 }),
  substract1: () => ({ type: SUBSTRACT1 }),
  substract2: () => ({ type: SUBSTRACT2 }),
  power2: () => ({ type: POWER2 }),
  powerself: () => ({ type: POWERSELF }),
  divide2: () => ({ type: DIVIDEBY2 }),
  sqrt: () => ({ type: SQRT }),
  clear: () => ({ type: CLEAR }),
});

const selectorFun = (value: number) => value;

export const CounterRedux = () => {
  const value = useSelector(selectorFun);
  const dispatch = useDispatch();
  return (
    <>
      <Helmet>
        <title>Redux Counter</title>
      </Helmet>
      <DivWrapper>
        <DivValue>
          <h1>{value}</h1>
        </DivValue>
        <DivButtons>
          <DivButtons>
            <Button onClick={() => dispatch(buttonFunctions().substract2())}>
              -2
            </Button>
            <Button onClick={() => dispatch(buttonFunctions().substract1())}>
              -1
            </Button>
            <Button onClick={() => dispatch(buttonFunctions().add1())}>
              +1
            </Button>
            <Button onClick={() => dispatch(buttonFunctions().add2())}>
              +2
            </Button>
          </DivButtons>
          <Button onClick={() => dispatch(buttonFunctions().power2())}>
            X<sup>2</sup>
          </Button>
          <Button onClick={() => dispatch(buttonFunctions().powerself())}>
            X<sup>X</sup>
          </Button>
          <Button onClick={() => dispatch(buttonFunctions().divide2())}>
            <span>{DIVISION_SYMBOL}</span>2
          </Button>
          <Button onClick={() => dispatch(buttonFunctions().sqrt())}>
            <span>{SQUARE_ROOT_SYMBOL}</span>X
          </Button>
          <DivButtons>
            <Button onClick={() => dispatch(buttonFunctions().clear())}>
              C
            </Button>
          </DivButtons>
        </DivButtons>
      </DivWrapper>
    </>
  );
};

const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DivValue = styled.div`
  font-size: 3rem;
  display: flex;
  align-items: center;
`;

const DivButtons = styled.div`
  text-align: center;
`;

const Button = styled.button`
  width: 100px;
  height: 100px;
`;
