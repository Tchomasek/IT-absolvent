/* eslint-disable prettier/prettier */
import React from "react";

type todoProps = {
  id: number;
  text: string;
  completed: boolean;
  handleChange: any;
  handleDelete: any
};

const TodoItem = ({ id, text, completed, handleChange,handleDelete }: todoProps) => (
  <div className="todo-item">
    <input
      type="checkbox"
      checked={completed}
      onChange={() => handleChange(id)}
    />
    {text}
    <button value={id} onClick={handleDelete}>x</button>
  </div>
);

export default TodoItem;
