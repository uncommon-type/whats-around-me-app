import React from 'react';
import Nav from './Nav';

const Footer = ({ children }) => (
  <footer>
    {children}
    <Nav />
  </footer>
);

export default Footer;
