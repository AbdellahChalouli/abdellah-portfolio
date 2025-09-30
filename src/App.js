import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HelloPage from './pages/HelloPage';
import MobilePage from './pages/MobilePage';
import WebPage from './pages/WebPage';
import WebWork from './pages/WebWork';
import ThreeDpage from './pages/ThreeDpage';
import ContactMe from './pages/ContactMe';
import AboutMe from './pages/AboutMe';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hello" element={<HelloPage />} />
        <Route path="/mobile" element={<MobilePage />} />
        <Route path="/web" element={<WebPage />} />
        <Route path="/WebWork" element={<WebWork />} />
        <Route path="/ThreeDpage" element={<ThreeDpage />} />
        <Route path="/ContactMe" element={<ContactMe />} />
        <Route path="/AboutMe" element={<AboutMe />} />

      </Routes>
    </Router>
  );
}

export default App;
