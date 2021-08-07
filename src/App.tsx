import "./App.css";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Counter from "./components/counter/Counter";
import HackerTyper from "./components/hacker-typer/HackerTyper";
import Modal from "react-modal";
import Pexeso from "./components/pexeso/Pexeso";
import TicTacToe from "./components/tic-tac-toe/TicTacToe";
import ToDo from "./components/todo/Todo";

Modal.setAppElement("#root");

export default function App() {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column" }}>
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
        </Switch>
      </div>
    </Router>
  );
}
