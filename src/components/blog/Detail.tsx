import { Alert } from "react-bootstrap";
import { ArticleState } from "./PostApp";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

export const Detail = (props: { article: ArticleState }) => {
  return (
    <>
      <Helmet>
        <title>Blog - {props.article.header}</title>
      </Helmet>
      {/* <Alert variant={"dark"}>{props.article.header}</Alert>
      <Alert variant={"light"}>
        <ReactMarkdown>{props.article.text}</ReactMarkdown>
      </Alert> */}
      <h2>{props.article.header}</h2>
      <hr></hr>
      <TextWrapper>
        <ReactMarkdown>{props.article.text}</ReactMarkdown>
      </TextWrapper>
    </>
  );
};

const TextWrapper = styled.div`
  /* border: solid; */
`;
