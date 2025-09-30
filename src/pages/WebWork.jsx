import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/WebWork.css';

function WebWork() {
  const navigate = useNavigate();
  const [expandedProject, setExpandedProject] = useState(null);

  const toggleDetails = (projectIndex) => {
    setExpandedProject(expandedProject === projectIndex ? null : projectIndex);
  };

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A modern online shopping platform with user authentication, product catalog, shopping cart, and payment integration.",
      videoSrc: "/webweb.mp4",
      details: {
        fullDescription: "This comprehensive e-commerce solution features a responsive React frontend with Redux state management, Node.js backend with Express framework, and MongoDB for data persistence. The platform includes advanced features like real-time inventory management, order tracking, user reviews, and admin dashboard for product management.",
        technologies: [
          "Frontend: React, JavaScript ES6+",
          "Backend: Node.js, Express.js, JWT Authentication",
          "Database: MongoDB",
          "Payment: Stripe API Integration",
          "Tools: Git, tailwind"
        ]
      }
    },
    {
      id: 2,
      title: "OVRED landing page",
      description: "A modern platform for company introduction and a professionally designed interface for receiving partnership requests.",
      videoSrc: "/ovred-overview.mp4",
      details: {
        fullDescription: "A modern, responsive landing page for OVRED delivery company built with React. Features a hero section, comprehensive services showcase with interactive cards, contact information, and smooth animations. Designed with a professional teal gradient theme and mobile-first approach.",
        technologies: [
          "UI: React, figma, node.js ",
          "pictures and icons: freepik.com , photopea, chat-gpt, adobe illustrator",
          "Tools: EmailJS, google sheet, react icons"
        ]
      }
    },

  ];

  return (
    <div className="webWork-container">
      {/* Main Header */}
      <h1 className="web-main-title">My Web Development Projects</h1>
      
      {/* Projects List */}
      <div className="projects-list">
        {projects.map((project, index) => (
          <div key={project.id} className="project-item">
            <h2 className="project-title">{project.title}</h2>
            <p className="project-description">{project.description}</p>
            
            {/* Video */}
            <div className="video-container">
              <video 
                width="800" 
                height="450" 
                controls
                
                className="project-video"
              >
                <source src={project.videoSrc} type="video/mp4" />
                <source src={project.videoSrc.replace('.mp4', '.webm')} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
            
            {/* More Informations Button */}
            <button 
              className="details-button"
              onClick={() => toggleDetails(index)}
            >
              {expandedProject === index ? 'Hide Informations' : 'More Informations'}
            </button>
            
            {/* Detailed Information (conditionally shown) */}
            {expandedProject === index && (
              <div className="details-section">
                <p className="detailed-description">
                  {project.details.fullDescription}
                </p>
                
                <div className="tech-stack">
                  <h3>Technologies Used:</h3>
                  <ul>
                    {project.details.technologies.map((tech, techIndex) => (
                      <li key={techIndex}>{tech}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WebWork;