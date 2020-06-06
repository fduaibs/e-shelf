import React from 'react';
import { Link } from 'react-router-dom';


import './styles.css';

export default function Home() {
  return (
    <div className="home-container">
      <Link className="back-link" to="/register">
        Register
      </Link>
      <Link className="back-link" to="/login">
        Login
      </Link>
      <Link className="back-link" to="/vehicles">
        Vehicles
      </Link>
    </div>
  );
}