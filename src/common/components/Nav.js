import React from 'react';

import { NavLink } from 'react-router-dom';

const Nav = () => (
  <nav>
    <ul className="nav">
      <li>
        <NavLink exact to="/">
          Map
        </NavLink>
      </li>
      <li>
        <NavLink to="/list">List</NavLink>
      </li>
      <li>
        <NavLink to="/settings">Settings</NavLink>
      </li>
    </ul>
  </nav>
);

export default Nav;