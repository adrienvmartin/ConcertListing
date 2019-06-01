import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <ul>
        <li>
          <Link to="/profiles">Users</Link>
        </li>
        <li>
          <Link to="/dashboard">
            <i className="fas fa-user" />{' '}
            <span className="hide-sm">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/listing">Listings</Link>
        </li>
        <li>
          <i className="fas fa-sign-out-alt" />
          {''}
          <span className="hide-sm">Logout</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
