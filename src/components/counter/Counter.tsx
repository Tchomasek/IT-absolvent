/* eslint-disable prettier/prettier */
import "./App.css";
import React from "react";
import randomColor from "randomcolor";

interface Props {}

interface State {
  counter: number;
  color: string;
}

class App extends React.Component<Props, State> {
  constructor(state: State) {
    super(state);
    this.state = { counter: 0, color: "blue" };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.changeColor = this.changeColor.bind(this);
  }

  changeColor() {
    let rColor = randomColor();
    this.setState({
      color: rColor,
    });
  }
  increment(event) {
    this.changeColor();
    this.setState((prevState) => {
      return {
        counter: prevState.counter + 1,
      };
    });
  }
  decrement(event) {
    this.changeColor();
    this.setState((prevState) => {
      return {
        counter: prevState.counter - 1,
      };
    });
  }
  render() {
    return (
      <div className="cont" style={{ color: this.state.color }}>
        <button onClick={this.decrement}>-1</button>
        <a>{this.state.counter}</a>
        <button onClick={this.increment}>+1</button>
      </div>
    );
  }
}

export default App;
