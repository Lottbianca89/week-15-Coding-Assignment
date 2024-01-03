import React from 'react';


const Event = ({ event, onDelete, onUpdate }) => {
  return (
    <div className="event-container">
      <p>{event.title}</p>
      <button onClick={() => onDelete(event.id)}>Delete</button>
      <button onClick={() => onUpdate(event)}>Update</button>
    </div>
  );
};

export default Event;