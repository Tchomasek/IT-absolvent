import { ArticleContext } from "./PostApp";
import { Create } from "./Create";
import { Detail } from "./Detail";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { Overview } from "./Overview";
import { useContext } from "react";
import styled from "styled-components";

export const URL_BASE = "/blog/";

export const Navbar = () => {
  const { articles } = useContext(ArticleContext);
  return (
    <>
      <Nav className="justify-content-center ">
        <Nav.Item>
          <Nav.Link href={URL_BASE}>Overview</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={URL_BASE + "create"}>Create new Blog Post</Nav.Link>
        </Nav.Item>
      </Nav>
      {/* <nav>
        <UlNavbar>
          <li>
            <Link to={URL_BASE}>Overview</Link>
          </li>
          <li>
            <Link to={URL_BASE + "create"}>Create new Blog Post</Link>
          </li>
        </UlNavbar>
      </nav> */}
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
    </>
  );
};

const UlNavbar = styled.ul`
  display: flex;
  list-style-type: none;
`;
