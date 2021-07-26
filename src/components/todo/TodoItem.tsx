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
  const textStyle = completed ? {fontSize: '40px', textDecoration:'line-through'} : {fontSize: '40px'}
  return (
  <div className="todo-item" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
    
    <input
      type="checkbox"
      style={{height: '30px', width: '30px'}}
      checked={completed}
      onChange={() => handleCheckboxToggle(id)}
    />
    {enableEdit ? (
      <input 
        type='text'
        style={{fontSize: '40px'}}
        autoFocus
        value={text}
        onChange={(e) => handleTextChange(e, id)}
        onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === 'Escape') {
                enableEditToggle(id)
                event.preventDefault()
                event.stopPropagation()
              }
            }}
      />
    ) : (
      <p 
        style={textStyle}
        onDoubleClick={() => enableEditToggle(id)}
      >{text}</p>
    )}
    <button value={id} onClick={handleDelete}>Delete</button>
  </div>
);
}

export default TodoItem;