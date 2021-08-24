import { Helmet } from "react-helmet";
import React from "react";
import TodoItem from "./TodoItem";
import styled from "styled-components";

interface Props {}

export type todoItem = {
  id: number;
  text: string;
  completed: boolean;
  enableEdit: boolean;
};

interface State {
  todos: todoItem[];
  newTodo: string;
  nextId: number;
  filter: string;
}

export class Todo extends React.Component<Props, State> {
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
    this.handleDelete = this.handleDelete.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.enableEditToggle = this.enableEditToggle.bind(this);
  }

  onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newTodoArray = {
      id: this.state.nextId,
      text: this.state.newTodo,
      completed: false,
      enableEdit: false,
    };
    this.setState((prevState) => {
      return {
        todos: prevState.todos.concat(newTodoArray),
        newTodo: "",
        nextId: prevState.nextId + 1,
      };
    });
  }

  handleCheckboxToggle(id: number) {
    this.setState((prevState) => {
      const updatedTodos = prevState.todos.map((todo: todoItem) => {
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

  handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ newTodo: e.target.value });
  }

  handleDelete(e: React.SyntheticEvent<HTMLButtonElement>) {
    const newTodos = this.state.todos.filter(
      (item) => item.id !== parseInt(e.currentTarget.value)
    );
    this.setState(() => {
      return {
        todos: newTodos,
      };
    });
  }

  handleTextChange(e: React.ChangeEvent<HTMLInputElement>, id: number) {
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

  enableEditToggle(id: number) {
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
      const todoItem = (
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
      if (this.state.filter === "all") {
        return todoItem;
      }
      if (this.state.filter === "active") {
        if (item.completed === false) {
          return todoItem;
        }
      }
      if (this.state.filter === "completed") {
        if (item.completed === true) {
          return todoItem;
        }
      }
    });

    return (
      <>
        <Helmet>
          <title>ToDo</title>
        </Helmet>
        <TodoListDiv className="todo-list">
          <InputDiv>
            <InputForm onSubmit={this.onSubmit}>
              <TextInput
                type="text"
                placeholder="add new task"
                autoFocus
                value={this.state.newTodo}
                onChange={this.handleInputChange}
              />
            </InputForm>
            <Button onClick={this.onSubmit}>Submit</Button>
          </InputDiv>
          {todoItems}
          <ButtonsDiv>
            <Button onClick={() => this.setState({ filter: "all" })}>
              All
            </Button>
            <Button onClick={() => this.setState({ filter: "completed" })}>
              Completed
            </Button>
            <Button onClick={() => this.setState({ filter: "active" })}>
              Active
            </Button>
          </ButtonsDiv>
          <P>Edit task with doubleclick, press Enter to confirm.</P>
        </TodoListDiv>
      </>
    );
  }
}

const Button = styled.button`
  margin: 5px;
`;

const InputDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
  align-items: center;
`;

const P = styled.p`
  display: flex;
  justify-content: center;
`;

const InputForm = styled.form`
  display: flex;
  justify-content: center;
`;

const TextInput = styled.input`
  font-size: 50px;
  width: 500px;
  height: 70px;
`;

const TodoListDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const ButtonsDiv = styled.div`
  display: flex;
  justify-content: center;
`;
