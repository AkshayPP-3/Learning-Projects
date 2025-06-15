import React, { useEffect } from 'react';
import './App.css';
import bgVideo from './assets/Background/animated-video-for-background.mp4';

function HomePage() {
  useEffect(() => {
    document.body.style.background = 'none';
    document.body.style.backgroundColor = '#000';
    // Prevent scrolling
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.background = '';
      document.body.style.backgroundColor = '';
      document.body.style.overflow = '';
    };
  }, []);
  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden', margin: 0, padding: 0 }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="main" style={{ position: 'relative', zIndex: 1, height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <div className="home-page" style={{ display: 'flex', alignItems: 'center', height: '100vh', marginLeft: '40px' }}>
          <AnimatedPlayButton />
        </div>
      </div>
    </div>
  );
}

// Animated black and white Play button
const AnimatedPlayButton = () => (
  <button className="animated-play-btn">
    <span>Play</span>
    <svg className="glow" width="180" height="60">
      <rect x="5" y="5" rx="25" width="170" height="50" />
    </svg>
  </button>
);

export default HomePage;
