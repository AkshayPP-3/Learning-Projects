import React, { useEffect } from 'react';
import './App.css';

function HomePage() {
  useEffect(() => {
    document.body.style.background = 'none';
    document.body.style.backgroundColor = '#000'; 
    return () => {
      document.body.style.background = '';
      document.body.style.backgroundColor = '';
    };
  }, []);
  return (
    <div
      className="main"
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: 'url(https://moewalls.com/anime/dual-katanas-miyamoto-musashi-vagabond-live-wallpaper/)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        margin: 0,
        padding: 0,
      }}
    >
      <div className="home-page">
        <h1>Welcome to the Home page!</h1>
      </div>
    </div>
  );
}

export default HomePage;
