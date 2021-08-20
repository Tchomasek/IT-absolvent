import styled from "styled-components";

type todoProps = {
  id: number;
  text: string;
  completed: boolean;
  handleCheckboxToggle: any;
  handleDelete: any;
  handleTextChange: any;
  enableEdit: boolean;
  enableEditToggle: any;
};

const TodoItem = ({
  id,
  text,
  completed,
  enableEdit,
  handleCheckboxToggle,
  handleDelete,
  handleTextChange,
  enableEditToggle,
}: todoProps) => {
  const textStyle = completed
    ? { fontSize: "40px", textDecoration: "line-through" }
    : { fontSize: "40px" };
  return (
    <TodoItemDiv className="todo-item">
      <CheckboxInput
        type="checkbox"
        checked={completed}
        onChange={() => handleCheckboxToggle(id)}
      />
      {enableEdit ? (
        <TextInput
          type="text"
          autoFocus
          value={text}
          onChange={(e) => handleTextChange(e, id)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === "Escape") {
              enableEditToggle(id);
              event.preventDefault();
              event.stopPropagation();
            }
          }}
        />
      ) : (
        <p style={textStyle} onDoubleClick={() => enableEditToggle(id)}>
          {text}
        </p>
      )}
      <button value={id} onClick={handleDelete}>
        Delete
      </button>
    </TodoItemDiv>
  );
};

const TodoItemDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const CheckboxInput = styled.input`
  height: 30px;
  width: 30px;
`;

const TextInput = styled.input`
  font-size: 40px;
`;

export default TodoItem;
