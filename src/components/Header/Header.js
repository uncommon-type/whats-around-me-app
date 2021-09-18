import React from 'react';

const Header = ({ children, title }) => {
  return (
    <header>
      {children}
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
