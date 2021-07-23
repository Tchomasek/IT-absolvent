/* eslint-disable prettier/prettier */
import React from "react";

type todoProps = {
  id: number;
  text: string;
  completed: boolean;
  handleCheckboxToggle: any;
  handleDelete: any;
  handleTextChange: any;
  enableEdit: boolean;
  enableEditToggle: any
};


const TodoItem = ({ id, text, completed, enableEdit, handleCheckboxToggle, handleDelete, handleTextChange, enableEditToggle }: todoProps) => {
  return (
  <div className="todo-item">
    <input
      type="checkbox"
      checked={completed}
      onChange={() => handleCheckboxToggle(id)}
    />
    {enableEdit ? (
      <input 
        type='text'
        value={text}
        onChange={(e) => handleTextChange(e, id)}
        onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === 'Escape') {
                console.log(id)
                enableEditToggle(id)
                event.preventDefault()
                event.stopPropagation()
              }
            }}
      />
    ) : (
      <p
    onDoubleClick={() => enableEditToggle(id)}
  >{text}</p>
    )}
    <button value={id} onClick={handleDelete}>x</button>
  </div>
);
}

export default TodoItem;

// {this.state.enableEdit ? (
//   <input
//   type="text"
//   value={this.state.valueOfInput}
//   onChange={(event) => {
//     this.setState({
//       valueOfInput: event.target.value
//     })
//   }}
//   onKeyDown={(event) => {
//     if (event.key === 'Enter' || event.key === 'Escape') {
//       this.setState({
//         enableEdit: false
//       })
//       event.preventDefault()
//       event.stopPropagation()
//     }
//   }}
// />         
// ) : (
//   <p
//     onDoubleClick={() => this.setState({
//       enableEdit: true
//     })}
//   >{this.state.valueOfInput}x</p>
// )}