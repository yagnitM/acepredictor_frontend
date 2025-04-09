import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">AcePredictor</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/predict">Predict</Link></li>
        <li><Link to="/contact">Stats</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
