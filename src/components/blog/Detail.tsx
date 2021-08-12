import { ArticleState } from "./PostApp";
import ReactMarkdown from "react-markdown";

export const Detail = (props: { article: ArticleState }) => {
  return <ReactMarkdown>{props.article.text}</ReactMarkdown>;
};
