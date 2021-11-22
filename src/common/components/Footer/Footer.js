import Nav from '../Nav/Nav';

import * as styles from './footer.module.css';

const Footer = ({ children }) => (
  <footer className={`${styles['footer']} gap-top`}>
    {children}
    <Nav />
  </footer>
);

export default Footer;
