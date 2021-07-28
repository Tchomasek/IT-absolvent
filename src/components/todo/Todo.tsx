import React from "react";
import TodoItem from "./TodoItem";

interface Props {}

interface State {
  todos: any;
  newTodo: string;
  nextId: number;
  filter: string;
}

class TodoList extends React.Component<Props, State> {
  constructor(state: State) {
    super(state);
    this.state = {
      todos: [],
      newTodo: "",
      nextId: 0,
      filter: "all",
    };
    this.handleCheckboxToggle = this.handleCheckboxToggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.enableEditToggle = this.enableEditToggle.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const newTodoArray = {
      id: this.state.nextId,
      text: this.state.newTodo,
      completed: false,
      enableEdit: false,
    };
    this.setState((prevState) => {
      return {
        todos: this.state.todos.concat(newTodoArray),
        newTodo: "",
        nextId: this.state.nextId + 1,
      };
    });
  }

  handleCheckboxToggle(id) {
    this.setState((prevState) => {
      const updatedTodos = prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
      return {
        todos: updatedTodos,
      };
    });
  }

  handleInputChange(e) {
    this.setState({ newTodo: e.target.value });
  }

  handleClick(e) {
    this.setState({ filter: e.target.value });
  }

  handleDelete(e) {
    const newTodos = this.state.todos.filter(
      (item) => item.id !== parseInt(e.target.value)
    );
    this.setState(() => {
      return {
        todos: newTodos,
      };
    });
  }

  handleTextChange(e, id) {
    const newTodos = this.state.todos.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          text: e.target.value,
        };
      }
      return item;
    });
    this.setState({
      todos: newTodos,
    });
  }

  enableEditToggle(id) {
    this.setState((prevState) => {
      const updatedTodos = prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            enableEdit: !todo.enableEdit,
          };
        }
        return todo;
      });

      return {
        todos: updatedTodos,
      };
    });
  }

  render() {
    const todoItems = this.state.todos.map((item) => {
      if (this.state.filter === "all") {
        return (
          <TodoItem
            key={item.id}
            id={item.id}
            text={item.text}
            completed={item.completed}
            handleCheckboxToggle={this.handleCheckboxToggle}
            handleDelete={this.handleDelete}
            handleTextChange={this.handleTextChange}
            enableEdit={item.enableEdit}
            enableEditToggle={this.enableEditToggle}
          />
        );
      }
      if (this.state.filter === "active") {
        if (item.completed === false) {
          return (
            <TodoItem
              key={item.id}
              id={item.id}
              text={item.text}
              completed={item.completed}
              handleCheckboxToggle={this.handleCheckboxToggle}
              handleDelete={this.handleDelete}
              handleTextChange={this.handleTextChange}
              enableEdit={item.enableEdit}
              enableEditToggle={this.enableEditToggle}
            />
          );
        }
      }
      if (this.state.filter === "completed") {
        if (item.completed === true) {
          return (
            <TodoItem
              key={item.id}
              id={item.id}
              text={item.text}
              completed={item.completed}
              handleCheckboxToggle={this.handleCheckboxToggle}
              handleDelete={this.handleDelete}
              handleTextChange={this.handleTextChange}
              enableEdit={item.enableEdit}
              enableEditToggle={this.enableEditToggle}
            />
          );
        }
      }
    });

    return (
      <div
        className="todo-list"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "50%",
        }}
      >
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="add new task"
            autoFocus
            value={this.state.newTodo}
            onChange={this.handleInputChange}
          />
        </form>
        {todoItems}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button value="all" onClick={this.handleClick}>
            All
          </button>
          <button value="completed" onClick={this.handleClick}>
            completed
          </button>
          <button value="active" onClick={this.handleClick}>
            active
          </button>
        </div>
        <p style={{ display: "flex", justifyContent: "center" }}>
          Edit task with doubleclick, press enter to confirm.
        </p>
      </div>
    );
  }
}

export default TodoList;
