import React, { Component } from "react";
import styled from "styled-components";

type squareProps = {
  handleClick: any;
  value: string;
};

export default class Square extends Component<squareProps, {}> {
  render() {
    const Td = styled.td`
    width: "50px",
    height: "50px",
    border: "1px solid black",
    `;
    return (
      <Td
        style={{
          width: "50px",
          height: "50px",
          border: "1px solid black",
        }}
        onClick={this.props.handleClick}
      >
        {this.props.value}
      </Td>
    );
  }
}
