/* eslint-disable prettier/prettier */
import "./App.css";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Counter from './components/counter/Counter'
import HackerTyper from './components/hacker-typer/HackerTyper'
import Modal from "react-modal";
import ToDo from './components/todo/Todo'


Modal.setAppElement('#root')

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/hacker-typer">Hacker Typer</Link>
            </li>
            <li>
              <Link to="/counter">Counter</Link>
            </li>
            <li>
              <Link to="/todo">ToDo</Link>
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
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h1>Home</h1>;
}

