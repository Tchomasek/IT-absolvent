import { Helmet } from "react-helmet";

const getJokes = async (category) => {
  const jokes: string[] = [];
  while (jokes.length < 5) {
    await fetch("https://api.chucknorris.io/jokes/random?category=" + category)
      .then((response) => response.json())
      .then((data) => {
        if (jokes.includes(data.value)) {
          console.log("duplicate");
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
  const notNull = window.document.getElementById("jokes")!;
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
      <div id="categoryDiv"></div>
    </>
  );
};
