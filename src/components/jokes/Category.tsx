import { Helmet } from "react-helmet";

const getJokes = async (category) => {
  const jokes: string[] = [];
  while (jokes.length < 5) {
    await fetch("https://api.chucknorris.io/jokes/random?category=" + category)
      .then((response) => response.json())
      .then((data) => {
        if (jokes.includes(data.value)) {
          console.log("a");
          return;
        } else {
          jokes.push(data.value);
        }
      });
  }
  const jokesHtml: string[] = [];
  jokes.map((x) => {
    jokesHtml.push(x + "<br>");
  });
  const notNull = window.document.getElementById("categoryDiv")!;
  notNull.innerHTML = String(jokesHtml).replace(/,/g, "");
  return jokesHtml;
};

export const Category = (props: { category: string }) => {
  getJokes(props.category);
  return (
    <>
      <Helmet>
        <title>Chuck Norris Jokes - {props.category}</title>
      </Helmet>
      <h2>{props.category}</h2>
      <div id="categoryDiv"></div>
    </>
  );
};
