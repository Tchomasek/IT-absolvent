/* eslint-disable prettier/prettier */
import React from "react";
import TodoItem from "./TodoItem";
import todosData from "./todosData";

interface Props {}

interface State {
  todos: any,
  newTodo: string,
  nextId: number,
  filter: string
}

class TodoList extends React.Component<Props, State>{
  constructor(state:State) {
    super(state);
    this.state = {
      todos: [],
      newTodo: '',
      nextId: 0,
      filter: 'all'
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  onSubmit(e){
    e.preventDefault()
    const newTodoArray = {id:this.state.nextId,text:this.state.newTodo,completed:false}
    this.setState(prevState =>{
      return {
        todos: this.state.todos.concat(newTodoArray),
        newTodo: '',
        nextId: this.state.nextId + 1
      }
    })
  }

  handleToggle(id) {
    this.setState((prevState) => {
      const updatedTodos = prevState.todos.map(todo => {
        if (todo.id === id) {
            return {
                ...todo,
                completed: !todo.completed
            }
        }
        return todo
    })
      return {
        todos: updatedTodos,
      };
    });
  }

  handleChange(e){
    this.setState({newTodo: e.target.value})
  }

  handleClick(e){
    this.setState({filter: e.target.value})
  }

  handleDelete(e){
    const newTodos = this.state.todos.filter(item => item.id !== parseInt(e.target.value))
    this.setState(()=>{
      return {
        todos: newTodos
      }
    })
  }

  render() {
    const todoItems = this.state.todos.map((item) => {
      if (this.state.filter === 'all'){
        return <TodoItem key={item.id} id={item.id} text={item.text} completed={item.completed} handleChange={this.handleToggle} handleDelete={this.handleDelete}/>
      }
      if (this.state.filter === 'active'){
        if (item.completed === false){
          return <TodoItem key={item.id} id={item.id} text={item.text} completed={item.completed} handleChange={this.handleToggle} handleDelete={this.handleDelete}/>
        }
      }
      if (this.state.filter === 'completed'){
        if (item.completed === true){
          return <TodoItem key={item.id} id={item.id} text={item.text} completed={item.completed} handleChange={this.handleToggle} handleDelete={this.handleDelete}/>
        }      
      }
    });


    return (
      <div className="todo-list">
        <form onSubmit={this.onSubmit}>
          <input type='text' autoFocus value={this.state.newTodo} onChange={this.handleChange}/>
        </form>
        {todoItems}
        <button value='all' onClick={this.handleClick}>All</button>
        <button value='completed' onClick={this.handleClick}>completed</button>
        <button value='active' onClick={this.handleClick}>active</button>
      </div>
    );
  }
}

export default TodoList;
