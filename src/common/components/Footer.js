import React from 'react';
import Nav from './Nav';

const Footer = ({ children }) => (
  <footer className="gap-top">
    {children}
    <Nav />
  </footer>
);

export default Footer;
