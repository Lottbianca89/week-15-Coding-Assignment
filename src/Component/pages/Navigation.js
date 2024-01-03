import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const eventLinks = [
    { to: '/events/birthday', text: 'Birthday' },
    { to: '/events/babyshower', text: 'Baby Shower' },
    { to: '/events/wedding', text: 'Wedding' },
    { to: '/events/graduation', text: 'Graduation' },
  ];

  return (
    <nav>
      {eventLinks.map((link, index) => (
        <Link key={index} to={link.to}>
          {link.text}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;