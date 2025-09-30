import React from 'react';
import '../styles/HelloPage.css';
import '../styles/WebPage.css';
import { FaLaptopCode, FaMobileAlt, FaCube } from 'react-icons/fa'; // example icons
import { useNavigate } from 'react-router-dom';
function WebPage() {
  const navigate = useNavigate();

  return (
    <div className="web-container">
      <h1 className="field-title">web section</h1>
      <h3 className="title">here you can see my webdev experience</h3>

      <div className="field-option" >
        <button className="myworkWeb-button" onClick={() => navigate('/WebWork')}>
           my work
        </button>
      </div>

      <div className="field-option" >
        <button className="myworkWeb-button" onClick={() => navigate('/ContactMe')}>
           contact me here
        </button>
      </div>

    </div>
  );
}

export default WebPage;