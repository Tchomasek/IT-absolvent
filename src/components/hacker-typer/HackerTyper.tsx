import { Helmet } from "react-helmet";
import Modal from "react-modal";
import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import templateText from "./Text";

interface State {
  text: string;
  counter: number;
  modalIsOpen: boolean;
  speed: number;
}

class App extends React.Component<{}, State> {
  constructor(state: State) {
    super(state);
    this.myHandler = this.myHandler.bind(this);
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
    const div = document.getElementById("cont")!;
    div.innerHTML = this.state.text;
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
        <Helmet>
          <title>HacterTyper</title>
        </Helmet>
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
            onChange={(e) => this.setState({ speed: parseInt(e.target.value) })}
          />
          <button onClick={this.closeSettings}>x</button>
        </Modal>
        <ContainerDiv id="cont"></ContainerDiv>
        <SettingsButtonDiv>
          <button id="settingsButton" onClick={this.openSettings}>
            Settings
          </button>
        </SettingsButtonDiv>
      </div>
    );
  }
}

const ContainerDiv = styled.div`
  white-space: pre;
`;

const SettingsButtonDiv = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const GlobalStyle = createGlobalStyle`
      body {
        background-color: black;
        color: green;
        overflow: visible
      }
      `;

export default App;
