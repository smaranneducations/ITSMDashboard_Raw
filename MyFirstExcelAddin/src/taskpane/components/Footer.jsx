import React, { useState, useEffect } from "react";
import './Footer.css'; // Import CSS file for styling
import OfficeContext from '../OfficeContext';

const Footer = () => {
  const [officeAppName, setOfficeAppName] = useState("");
  const [officeAppVersion, setOfficeAppVersion] = useState("");
  const [officePlatform, setOfficePlatform] = useState("");

  useEffect(() => {
    // Ensure Office.js is loaded
    Office.onReady(() => {
      // Once Office.js is ready, access context information
      const contextInfo = Office.context.diagnostics;
      setOfficeAppName("Office application: " + contextInfo.host);
      setOfficeAppVersion("Office version: " + contextInfo.version);
      setOfficePlatform("Platform: " + contextInfo.platform);
    });
  }, []); // Empty dependency array ensures this runs once after initial render

  return (
    <footer className="footer">
      <div className="column" style={{ width: '10vw' }}>
        <p>{officeAppName}, {officeAppVersion}, {officePlatform}</p>
      </div>
    </footer>
  );
};

export default Footer;
