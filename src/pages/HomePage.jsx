import React from 'react';
import '../styles/HomePage.css';
import { VscDebugContinue } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <button className="start-button" onClick={() => navigate('/hello')}>
        <VscDebugContinue className="continue-icon" />
      </button>
      <p className="start-text">START</p>
    </div>
  );
}

export default HomePage;
