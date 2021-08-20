import "./App.css";
import { BlogApp } from "./components/blog/PostApp";
import { CounterRedux } from "./components/counter-redux/CounterRedux";
import { Jokes } from "./components/jokes/Jokes";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Pexeso } from "./components/pexeso/Pexeso";
import { Provider } from "react-redux";
import { store } from "./components/counter-redux/CounterRedux";
import Counter from "./components/counter/Counter";
import HackerTyper from "./components/hacker-typer/HackerTyper";
import TicTacToe from "./components/tic-tac-toe/TicTacToe";
import ToDo from "./components/todo/Todo";

export default function App() {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column" }} className="app">
        <nav>
          <ul
            style={{
              display: "flex",
              color: "blue",
              backgroundColor: "grey",
              listStyleType: "none",
              justifyContent: " ",
            }}
          >
            <li>
              <Link to="/hacker-typer">Hacker Typer</Link>
            </li>
            <li>
              <Link to="/counter">Counter</Link>
            </li>
            <li>
              <Link to="/todo">ToDo</Link>
            </li>
            <li>
              <Link to="/tic-tac-toe">Tic Tac Toe</Link>
            </li>
            <li>
              <Link to="/pexeso">Catxeso</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/jokes">Jokes</Link>
            </li>
            <li>
              <Link to="/counter-redux">Counter Redux</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/todo">
            <ToDo />
          </Route>
          <Route path="/hacker-typer">
            <HackerTyper />
          </Route>
          <Route path="/counter">
            <Counter />
          </Route>
          <Route path="/tic-tac-toe">
            <TicTacToe />
          </Route>
          <Route path="/pexeso">
            <Pexeso />
          </Route>
          <Route path="/blog">
            <BlogApp />
          </Route>
          <Route path="/jokes">
            <Jokes />
          </Route>
          <Provider store={store}>
            <Route path="/counter-redux">
              <CounterRedux />
            </Route>
          </Provider>
        </Switch>
      </div>
    </Router>
  );
}
