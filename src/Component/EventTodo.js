import React, { useState } from 'react';

const EventTodo = ({ todo, deleteTodo, editTodo }) => {
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(false);
  const [text, setText] = useState(todo.name);

  const toggleEdit = () => {
    setEdit(!edit);
    setText(todo.name);
    setError(false);
  };

  const handleEdit = (evt) => {
    setError(evt.target.value === '');
    setText(evt.target.value);
  };

  const handleUpdate = () => {
    if (!error) {
      editTodo(todo.id, { ...todo, name: text });
      toggleEdit();
    }
  };

  return (
    <div className="event">
      {!edit ? (
        <>
          <strong>Name:</strong> {todo.name}
          <br />
          <strong>Date:</strong> {todo.date}
          <br />
          <strong>Location:</strong> {todo.location}
          <br />
          <strong>Description:</strong> {todo.description}
          <br />
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          <button onClick={toggleEdit}>Edit</button>
        </>
      ) : (
        <>
          <label>Name:</label>
          <input type="text" value={text} onChange={handleEdit} />
          <button disabled={error} onClick={handleUpdate}>
            Update
          </button>
          <button onClick={toggleEdit}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default EventTodo;
