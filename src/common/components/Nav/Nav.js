import { NavLink } from 'react-router-dom';

import * as styles from './nav.module.css';

const Nav = () => (
  <nav>
    <ul className={styles['nav']}>
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
