import React from 'react';
import EventDatePicker from './EventDatePicker';


const HomeWithEvents = () => {
  const allEvents = ['Birthday Party', 'Family Reunion', 'Wedding', 'Graduations'];

  return (
    <div className='home-with-events-container'>
      <div className='header'>
        <h1>Welcome to the Event Planner Service</h1>
        <p>Plan your events with ease using our service.</p>
      </div>

      <div className='event-section'>
        <h2>Select Event Date:</h2>
        <EventDatePicker />
      </div>

      <div className='event-section'>
        <h2>All Events:</h2>
        <ul>
          {allEvents.map((event, index) => (
            <li key={index}>{event}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeWithEvents;