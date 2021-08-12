import { Helmet } from "react-helmet";
import { Navbar } from "./Navbar";
import { useLocalStorage } from "./UseLocalStorage";
import React from "react";

export type ArticleState = {
  id: number;
  header: string;
  text: string;
};
export type ArticleContextState = {
  articles: ArticleState[];
  addNewArticle: (id: number, header: string, text: string) => void;
};

export const ArticleContext = React.createContext<ArticleContextState>({
  articles: [],
  addNewArticle: () => {},
});

export const BlogApp = () => {
  const [articles, setArticle] = useLocalStorage(
    "articles",
    [] as ArticleState[]
  );

  const addNewArticle = (newId: number, newHeader: string, newText: string) => {
    const newArticle: ArticleState = {
      id: newId,
      header: newHeader,
      text: newText,
    };
    setArticle((prevState) => [newArticle, ...prevState]);
  };
  return (
    <ArticleContext.Provider value={{ articles, addNewArticle }}>
      <Helmet>
        <title>Blog</title>
      </Helmet>
      <h1>My Blog</h1>
      <Navbar />
    </ArticleContext.Provider>
  );
};
