import { ArticleContext } from "./PostApp";
import { Create } from "./Create";
import { Detail } from "./Detail";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Overview } from "./Overview";
import { useContext } from "react";

export const URL_BASE = "/blog/";

export const Navbar = () => {
  const { articles } = useContext(ArticleContext);
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to={URL_BASE}>Overview</Link>
          </li>
          <li>
            <Link to={URL_BASE + "create"}>Create</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path={URL_BASE}>
          <Overview />
        </Route>
        <Route exact path={URL_BASE + "create"}>
          <Create />
        </Route>
        {articles.map((article) => (
          <Route key={article.id} path={URL_BASE + "article/" + article.id}>
            <Detail article={article} />
          </Route>
        ))}
      </Switch>
    </Router>
  );
};
