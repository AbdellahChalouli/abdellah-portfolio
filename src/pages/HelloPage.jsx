import React from 'react';
import '../styles/HelloPage.css';
import { FaLaptopCode, FaMobileAlt, FaCube } from 'react-icons/fa';
import { MdOutlinePerson3 } from "react-icons/md"; // example icons
import { useNavigate } from 'react-router-dom';
function HelloPage() {
  const navigate = useNavigate();

  return (
    <div className="hello-container">
      <h1 className="field-title">FIELDS</h1>

      <div className="field-option" onClick={() => navigate('/web')}>
        <button className="icon-button">
          <FaLaptopCode className="btn-icon" />
        </button>
        <span className="field-label">WEBDEV</span>
      </div>

      <div className="field-option" onClick={() => navigate('/mobile')}>
        <button className="icon-button">
          <FaMobileAlt className="btn-icon" />
        </button>
        <span className="field-label">MOBILE APP DEV</span>
      </div>

      <div className="field-option" onClick={() => navigate('/ThreeDpage')}>
        <button className="icon-button">
          <FaCube className="btn-icon" />
        </button>
        <span className="field-label">3D DESIGN</span>
      </div>

      <div className="field-option" onClick={() => navigate('/AboutMe')}>
        <button className="icon-button">
          <MdOutlinePerson3 className="btn-icon" />
        </button>
        <span className="field-label">about me</span>
      </div>
    </div>
  );
}

export default HelloPage;