import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Eventform from './Component/Eventform';
import EventTodo from './Component/EventTodo';
import HomeWithEvents from './Component/HomeWithEvents';
import Contact from './Component/pages/Contact';
import EventList from './Component/EventList';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://65510c027d203ab6626e79c0.mockapi.io/MockApi/EventPlannerServices');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('https://65510c027d203ab6626e79c0.mockapi.io/MockApi/EventPlannerServices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });

      const createdEvent = await response.json();
      setEvents([...events, createdEvent]);
      setNewEvent({ name: '', date: '', location: '', description: '' });
      // After creating an event, navigate to a specific route (e.g., the home page)
      window.location.href = '/'; // You can use any other method for navigation here
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`https://65510c027d203ab6626e79c0.mockapi.io/MockApi/EventPlannerServices/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });

      const updatedEvent = await response.json();
      setEvents(events.map((event) => (event.id === id ? updatedEvent : event)));
      setEditingEvent(null);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://65510c027d203ab6626e79c0.mockapi.io/MockApi/EventPlannerServices/${id}`, {
        method: 'DELETE',
      });

      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const allEvents = ['Graduation', 'Birthday Party', 'Family Reunion', 'Wedding']; // Updated list of events

  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <h1>Event Planner Services</h1>
          <nav>
            <Link to="/">HomeWithEvents</Link>
            <Link to="/events">Events</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeWithEvents allEvents={allEvents} />} />
            <Route
              path="/events"
              element={
                loading ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    <EventList events={events} />
                    <div>
                      {events.map((event) => (
                        <EventTodo
                          key={event.id}
                          todo={event}
                          deleteTodo={() => handleDelete(event.id)}
                          editTodo={() => setEditingEvent(event.id)}
                        />
                      ))}
                    </div>
                    <div>
                      <div>
                        <Eventform onSubmit={handleCreate} />
                      </div>
                    </div>
                  </>
                )
              }
            />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;