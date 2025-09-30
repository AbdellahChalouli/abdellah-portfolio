import React from 'react';
import '../styles/MobilePage.css';
import { ImSpinner8 } from 'react-icons/im'; // spinning loader icon

function ThreeDpage() {
  return (
    <div className="mobile-container">
      <ImSpinner8 className="loading-icon" />
      <p className="coming-text">Coming soon ...</p>
    </div>
  );
}

export default ThreeDpage;
