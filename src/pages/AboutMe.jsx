import React from "react";
import '../styles/AboutMe.css';
import { useNavigate } from 'react-router-dom';
function AboutMe() {
  const navigate = useNavigate();
  return (
    <div className="about-container">
      <h1 className="about-title">ABOUT ME</h1>
      
      <div className="about-content">
        <div className="about-text-section">
          <p className="about-text">
            Hello! I'm <span className="highlight">CHALOULI ABDELLAH</span>, a passionate
            developer who loves building modern web and mobile apps, and exploring
            creative 3D design. I enjoy turning ideas into beautiful and functional
            digital experiences, EXPLORING NEW CHALENGES.
          </p>
          <button className="mywork-button"  onClick={() => navigate('/ContactMe')}>contact me</button>
        </div>
        
        <div className="about-image-section">
          <img 
            src="/path/to/your/image.png" 
            alt="Your Name - Developer" 
            className="about-image"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutMe;