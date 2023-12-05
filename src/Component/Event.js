// Event.js
import React from 'react';

const Event = ({ Event, onDelete, onUpdate }) => {
  return (
    <div>
      <p>{Event.title}</p>
      <button onClick={() => onDelete(Event.id)}>Delete</button>
      <button onClick={() => onUpdate(Event)}>Update</button>
    </div>
  );
};

export default Event;