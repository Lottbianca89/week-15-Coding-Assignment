import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    location: '',
    description: '',
  });
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://65510c027d203ab6626e79c0.mockapi.io/MockApi/EventPlanner');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('https://65510c027d203ab6626e79c0.mockapi.io/MockApi/EventPlanner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });

      const createdEvent = await response.json();
      setEvents([...events, createdEvent]);
      setNewEvent({ name: '', date: '', location: '', description: '' });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`https://65510c027d203ab6626e79c0.mockapi.io/MockApi/EventPlanner/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });

      const updatedEvent = await response.json();
      setEvents(events.map(event => (event.id === id ? updatedEvent : event)));
      setEditingEvent(null);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://65510c027d203ab6626e79c0.mockapi.io/MockApi/EventPlanner/${id}`, {
        method: 'DELETE',
      });

      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="event-planner">
      <h1>Event Planner Services</h1>
      <div className="event-list">
        {events.map(event => (
          <div key={event.id} className="event">
            {editingEvent === event.id ? (
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  value={newEvent.name}
                  onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                />
                <label>Date:</label>
                <input
                  type="text"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                />
                <label>Location:</label>
                <input
                  type="text"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                />
                <label>Description:</label>
                <input
                  type="text"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                />
                <button onClick={() => handleUpdate(event.id)}>Update</button>
                <button onClick={() => setEditingEvent(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <strong>Name:</strong> {event.name}
                <br />
                <strong>Date:</strong> {event.date}
                <br />
                <strong>Location:</strong> {event.location}
                <br />
                <strong>Description:</strong> {event.description}
                <br />
                <button onClick={() => setEditingEvent(event.id)}>Edit</button>
                <button onClick={() => handleDelete(event.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="new-event">
        <label>Name:</label>
        <input
          type="text"
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
        />
        <label>Date:</label>
        <input
          type="text"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        />
        <label>Location:</label>
        <input
          type="text"
          value={newEvent.location}
          onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
        />
        <label>Description:</label>
        <input
          type="text"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        />
        <button onClick={handleCreate}>Create Event</button>
      </div>
      {/* Navigation Links */}
      <ul className="navigation">
      
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <img src="https://mylargebox.com/wp-content/uploads/2018/07/event.jpg" alt="Girl in a jacket"></img>
      <img src="https://yannidesignstudio.com/app/uploads/2019/11/conrad-indianapolis-indiana-tall-floral-centerpieces-guest-table-decor-pink-purple-floral-wedding-reception-decoration-ideas-venue.jpg" alt="Girl in a jacket"></img>

    </div>
  );
};

export default App;