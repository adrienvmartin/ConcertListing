import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
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
          <i className="fas fa-sign-out-alt" />
          {''}
          <span className="hide-sm">Logout</span>
      </li>
    </ul>
  );
};

export default Navbar
