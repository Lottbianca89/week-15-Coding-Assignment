//EventHandler
import React, { useState } from "react";

function EventTodo({ todo, completeTodo, deleteTodo, editTodo }) {
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(false);
  const [text, setText] = useState(todo.text);

  const toggleEdit = () => {
    setEdit(!edit);
    
    setText(todo.text);
    setError(false);
  };

  const handleEdit = (evt) => {
    (evt.target.value === "") ? setError(true) : setError(false);
    setText(evt.target.value);
  };

  const handleUpdate = (id, text) => {
    editTodo(id, text);
    toggleEdit();
  };
 const handleDelete= (id,text) =>{
  


 }
  return (
    <li>
      <input type="checkbox" checked={todo.isCompleted} onChange={() => completeTodo(todo.id)} />

      

      {!edit ? (
        <>
          <span style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}> {todo.text} </span>
          <button onClick={() => deleteTodo(todo.id)}>X</button>
          <button onClick={() => toggleEdit()} disabled={todo.isCompleted}>
            Edit
          </button>
        </>
      ) : (
        <>
          <input type="text" value={text} onChange={handleEdit} />
          <button disabled={error} onClick={() => handleUpdate(todo.id, text)}>
            Update
          </button>
          <button onClick={() => toggleEdit()}> Cancel </button>
        </>
      )}
    </li>
  );
}

export default EventTodo;