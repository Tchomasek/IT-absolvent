import { Badge, Button, Card } from "react-bootstrap";
import React from "react";
import styled from "styled-components";

type LinkCardProps = {
  name: string;
  img: string;
  link: string;
};

export const LinkCard = (props: LinkCardProps) => {
  return (
    <>
      <A href={props.link}>
        <Card className="h-100 shadow-sm bg-white rounded">
          <Card.Img variant="top" src={props.img} />
          <Card.Body
            style={{ justifyContent: "flex-end" }}
            className="d-flex flex-column "
          >
            <div className="d-flex ">
              <TitleDiv>{props.name}</TitleDiv>
            </div>
          </Card.Body>
        </Card>
      </A>
    </>
  );
};

const A = styled.a`
  text-decoration: none;
`;

const TitleDiv = styled.div``;
