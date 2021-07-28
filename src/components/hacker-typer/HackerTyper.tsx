import { createGlobalStyle } from "styled-components";
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
const GlobalStyle = createGlobalStyle`
      body {
        background-color: black;
        color: green;
        overflow: visible
      }
      `;
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
        <GlobalStyle />
        <Modal
          isOpen={this.state.modalIsOpen}
          style={{
            content: {
              top: "35%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              width: "60%",
              transform: "translate(-40%, -10%)",
            },
          }}
        >
          Speed:
          <input
            type="number"
            value={this.state.speed}
            onChange={this.handleSpeedChange}
          />
          <button onClick={this.closeSettings}>x</button>
        </Modal>
        <div style={{ whiteSpace: "pre" }} id="cont"></div>
        <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
          <button id="settingsButton" onClick={this.openSettings}>
            Settings
          </button>
        </div>
      </div>
    );
  }
}

export default App;
