// EventForm.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EventForm = ({ onSubmit }) => {
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: new Date(),
    time: '',
    location: '',
    description: '',
  });

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const formStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
  };

  const { name, date, time, location, description } = newEvent;

  const handleDateChange = (date) => {
    setNewEvent({ ...newEvent, date });
  };

  const handleTimeChange = (e) => {
    setNewEvent({ ...newEvent, time: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newEvent);
    setNewEvent({
      name: '',
      date: new Date(),
      time: '',
      location: '',
      description: '',
    });
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <label style={labelStyle}>Name:</label>
      <input
        type="text"
        placeholder="Enter event name"
        value={name}
        onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
        style={inputStyle}
      />

      <label style={labelStyle}>Date:</label>
      <DatePicker
        selected={date}
        onChange={handleDateChange}
        dateFormat="MMMM d, yyyy"
        style={inputStyle}
      />

      <label style={labelStyle}>Time:</label>
      <input
        type="text"
        placeholder="Enter event time"
        value={time}
        onChange={handleTimeChange}
        style={inputStyle}
      />

      <label style={labelStyle}>Location:</label>
      <input
        type="text"
        placeholder="Enter event location"
        value={location}
        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
        style={inputStyle}
      />

      <label style={labelStyle}>Description:</label>
      <input
        type="text"
        placeholder="Enter event description"
        value={description}
        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        style={inputStyle}
      />

      <button type="submit" style={buttonStyle}>
        Create Event
      </button>
    </form>
  );
};

export default EventForm;
