import * as React from "react";
import './Footer.css'; // Import CSS file for styling
import { HashRouter, Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="column" style={{ width: '10vw' }}>
      <HashRouter>
          <Link to="/test">
           Approval workflows 
          </Link>
          </HashRouter>
      </div>
    </footer>
  );
};

export default Footer;
