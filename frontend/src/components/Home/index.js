import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default function Home() {
  return (
    <div className="home-container">
      <Link className="back-link" to="/users/new">
        Create new user
      </Link>
      <Link className="back-link" to="/login">
        Login
      </Link>
      <Link className="back-link" to="/vehicles">
        Vehicles
      </Link>
      <Link className="back-link" to="/vehicles/new">
        Create new vehicle
      </Link>
    </div>
  );
}