import { ArticleState } from "./PostApp";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";
export const Detail = (props: { article: ArticleState }) => {
  return (
    <>
      <Helmet>
        <title>Blog - {props.article.header}</title>
      </Helmet>
      <ReactMarkdown>{props.article.text}</ReactMarkdown>
    </>
  );
};
