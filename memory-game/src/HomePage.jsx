import React, { useEffect, useState } from 'react';
import './App.css';
import bgVideo from './assets/Background/animated-video-for-background.mp4';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [showHowTo, setShowHowTo] = useState(false);
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
        <div className="home-page" style={{ display: 'flex', alignItems: 'center', height: '100vh', marginLeft: '150px', position: 'relative' }}>
          <AnimatedPlayButton />
          <HowToPlayButton onClick={() => setShowHowTo(v => !v)} />
        </div>
        {showHowTo && <HowToPlayModal onClose={() => setShowHowTo(false)} />}
      </div>
    </div>
  );
}

function HowToPlayButton({ onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      aria-label="How to Play"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        marginLeft: '32px',
        background: hover ? '#fff' : 'rgba(0,0,0,0.7)',
        border: '2px solid #fff',
        borderRadius: '50%',
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '2rem',
        color: hover ? '#232526' : '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        position: 'relative',
        zIndex: 3,
        transition: 'background 0.2s, color 0.2s',
      }}
    >
      ?
    </button>
  );
}

function HowToPlayModal({ onClose }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.7)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: '#181818',
        color: '#fff',
        borderRadius: '16px',
        padding: '32px 28px 24px 28px',
        maxWidth: '420px',
        width: '90vw',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
        fontFamily: `'Press Start 2P', 'VT323', 'Courier New', Courier, monospace`,
        fontSize: '0.9rem',
        position: 'relative',
        textAlign: 'left',
      }}>
        <button
          onClick={onClose}
          aria-label="Close How to Play"
          onMouseEnter={e => e.currentTarget.style.color = '#ffb347'}
          onMouseLeave={e => e.currentTarget.style.color = '#fff'}
          style={{
            position: 'absolute',
            top: '12px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '1.1rem',
            cursor: 'pointer',
            fontWeight: 700,
            fontFamily: `'Press Start 2P', 'VT323', 'Courier New', Courier, monospace`,
            transition: 'color 0.2s, transform 0.3s cubic-bezier(.68,-0.55,.27,1.55)',
            outline: 'none',
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.7) rotate(180deg)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
        >
          ×
        </button>
        <h2 style={{ fontSize: '1.02rem', marginBottom: '13px', letterSpacing: '1.2px', textAlign: 'center', color: '#ffb347', textShadow: '0 2px 8px #0008' }}>How to Play</h2>
        <ul style={{ paddingLeft: '1.1em', marginBottom: 0, fontSize: '0.82rem', lineHeight: 1.5, color: '#ffe082', listStyleType: 'disc' }}>
          <li style={{ marginBottom: '4px' }}>Click the <b>"PLAY"</b> button to start the game.</li>
          <li style={{ marginBottom: '4px' }}>Choose your favorite Anime from the list.</li>
          <li style={{ marginBottom: '4px' }}>Select a level (Easy, Medium, Hard) for your favorite anime.</li>
          <li style={{ marginBottom: '4px' }}>Click each card only once. <span style={{ color: '#ff7675' }}>If you click the same card twice, you lose!</span></li>
          <li style={{ marginBottom: '4px' }}>Medium/Hard: Only 5 cards are visible at a time, and they shuffle after every click.</li>
          <li style={{ marginBottom: '4px' }}>Try to click all unique cards to win and advance to the next level.</li>
          <li style={{ marginBottom: '4px' }}>Each anime/game has its own themed win/lose popups and progression.</li>
          <li>Use the <b>"Next Level"</b> button after a win to keep playing!</li>
        </ul>
        <div style={{ marginTop: 10, fontSize: '0.8rem', color: 'orange', textAlign: 'center', fontWeight: 600, textShadow: '0 1px 4px #0006' }}>
          Good luck, and have fun testing your memory with your favorite anime heroes!
        </div>
      </div>
    </div>
  );
}

function AnimatedPlayButton() {
  const navigate = useNavigate();
  return (
    <button 
      className="cta retro-play-btn" 
      onClick={() => navigate('/heropage')}
      style={{
        fontFamily: `'Press Start 2P', 'VT323', 'Courier New', Courier, monospace`,
        fontWeight: 700,
        letterSpacing: '2.5px',
        fontSize: '1.6rem',
        textTransform: 'uppercase',
        outline: 'none',
        position: 'relative',
        zIndex: 2,
        border: 'none',
        textShadow: 'none',
      }}
    >
       <span>PLAY</span>
    <span>
      <svg width="66px" height="43px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g id="arrow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <path className="one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
          <path className="two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
          <path className="three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
        </g>
      </svg>
    </span>
    </button>
  );
}

export default HomePage;
