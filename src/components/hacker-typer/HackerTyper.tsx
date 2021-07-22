/* eslint-disable prettier/prettier */
import "./HackerTyper.css";
import Modal from "react-modal";
import React from "react";
import templateText from "./Text.jsx";

interface Props {}

interface State {
  text: string;
  counter: number;
  modalIsOpen: boolean;
  speed: number;
}

// Modal.setAppElement("");

class App extends React.Component<Props, State> {
  constructor(state: State) {
    super(state);
    this.myHandler = this.myHandler.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.openSettings = this.openSettings.bind(this);
    this.closeSettings = this.closeSettings.bind(this);
    this.state = {
      text: "",
      counter: 0,
      modalIsOpen: false,
      speed: 5,
    };
  }

  myHandler() {
    this.setState((prevState) => {
      return {
        text:
          prevState.text +
          templateText.slice(
            this.state.counter,
            this.state.counter + this.state.speed
          ),
        counter: prevState.counter + this.state.speed,
      };
    });
    const div = document.getElementById("cont");
    //@ts-ignore
    div.innerHTML = this.state.text;
  }

  handleSpeedChange(e) {
    this.setState(() => {
      return {
        speed: parseInt(e.target.value),
      };
    });
  }
  componentDidMount() {
    document.addEventListener("keydown", this.myHandler);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.myHandler);
  }

  openSettings() {
    this.setState({ modalIsOpen: true });
    document.removeEventListener("keydown", this.myHandler);
  }

  closeSettings() {
    this.setState({ modalIsOpen: false });
    document.addEventListener("keydown", this.myHandler);
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modalIsOpen}>
          <button onClick={this.closeSettings}>x</button>
          speed:
          <input
            type="number"
            value={this.state.speed}
            onChange={this.handleSpeedChange}
          />
        </Modal>
        <div id="cont"></div>
        <button onClick={this.openSettings}>Settings</button>
      </div>
    );
  }
}

export default App;
