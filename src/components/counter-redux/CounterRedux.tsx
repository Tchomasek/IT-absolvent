import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { createStore } from "redux";
import styled from "styled-components";

const reducer = (state = 0, action: { type: string }) => {
  switch (action.type) {
    case "add1":
      return state + 1;
    case "add2":
      return state + 2;
    case "substract1":
      return state + -1;
    case "substract2":
      return state + -2;
    case "power2":
      return Math.pow(state, 2);
    case "powerself":
      return Math.pow(state, state);
    case "divide2":
      return state / 2;
    case "sqrt":
      if (state < 0) {
        alert("Nobody likes imaginary numbers!");
        return Math.sqrt(Math.abs(state));
      }
      return Math.sqrt(state);
    case "clear":
      return 0;
    default:
      return state;
  }
};

export const store = createStore(reducer);

type CounterProps = {
  value: { value: number | string };
  add1: () => void;
  add2: () => void;
  substract1: () => void;
  substract2: () => void;
  power2: () => void;
  powerself: () => void;
  divide2: () => void;
  sqrt: () => void;
  clear: () => void;
};

const mapStateToProps = (state: { value: number | string }) => {
  return {
    value: state,
  };
};

const mapDispatchToProps = (
  dispatch: (operation: { type: string }) => void
) => ({
  add1: () => dispatch({ type: "add1" }),
  add2: () => dispatch({ type: "add2" }),
  substract1: () => dispatch({ type: "substract1" }),
  substract2: () => dispatch({ type: "substract2" }),
  power2: () => dispatch({ type: "power2" }),
  powerself: () => dispatch({ type: "powerself" }),
  divide2: () => dispatch({ type: "divide2" }),
  sqrt: () => dispatch({ type: "sqrt" }),
  clear: () => dispatch({ type: "clear" }),
});

const CounterRedux = (props: CounterProps) => {
  return (
    <>
      <Helmet>
        <title>Redux Counter</title>
      </Helmet>
      <DivWrapper>
        <DivValue>
          <h1>{props.value}</h1>
        </DivValue>
        <DivButtons>
          <DivButtons>
            <Button onClick={props.substract2}>-2</Button>
            <Button onClick={props.substract1}>-1</Button>
            <Button onClick={props.add1}>+1</Button>
            <Button onClick={props.add2}>+2</Button>
          </DivButtons>
          <Button onClick={props.power2}>
            X<sup>2</sup>
          </Button>
          <Button onClick={props.powerself}>
            X<sup>X</sup>
          </Button>
          <Button onClick={props.divide2}>
            <span>&#247;</span>2
          </Button>
          <Button onClick={props.sqrt}>
            <span>&#8730;</span>X
          </Button>
          <DivButtons>
            <Button onClick={props.clear}>C</Button>
          </DivButtons>
        </DivButtons>
      </DivWrapper>
    </>
  );
};

export const CounterInRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterRedux);

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
