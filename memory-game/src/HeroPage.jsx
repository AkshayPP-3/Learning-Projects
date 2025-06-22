import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const animeCards = [
  {
    title: 'ONE PIECE',
    video: '/assets/Background/luffy_fixed.mp4',
  },
  {
    title: 'MY HERO ACADEMIA',
    video: '/assets/Background/deku_fixed.mp4',
  },
  {
    title: 'BLEACH',
    video: '/assets/Background/ichigo_fixed.mp4',
  },
];

function use3DHoverFollowCursor() {
  const ref = useRef(null);
  const shineRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = ref.current;
    const shine = shineRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 25;
    const rotateY = ((x - centerX) / centerX) * 25;
    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.12)`;
    card.style.border = '2px solid #00ffe7';
    // Shine effect
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${x}px ${y}px, #fff7, transparent 40%)`;
      shine.style.opacity = 1;
    }
  };

  const handleMouseLeave = () => {
    const card = ref.current;
    const shine = shineRef.current;
    if (!card) return;
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    card.style.border = 'none';
    if (shine) shine.style.opacity = 0;
  };

  return { ref, shineRef, handleMouseMove, handleMouseLeave };
}

const cardWidth = 200;
const cardHeight = 280;

const HeroPage = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: 0
      }}
    >
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
          zIndex: -1
        }}
      >
        <source src={'/assets/Background/hero_background_fixed.mp4'} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={{ position: 'relative', zIndex: 1, height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h1 className="hero-title" style={{
          color: '#fff',
          textShadow: '0 2px 12px #000, 0 0 8px #00ffe7',
          marginBottom: '40px',
          fontSize: '2.5rem',
          letterSpacing: '3px',
          fontFamily: '"Press Start 2P", "Segoe UI", Arial, sans-serif',
          background: 'none',
          WebkitBackgroundClip: 'initial',
          WebkitTextFillColor: 'initial',
          fontWeight: 900,
          textAlign: 'center',
          textTransform: 'uppercase',
        }}>
          Choose one anime
        </h1>
        <div className="hero-flex" style={{ display: 'flex', gap: '32px' }}>
          {animeCards.map((card) => {
            const { ref, shineRef, handleMouseMove, handleMouseLeave } = use3DHoverFollowCursor();
            return (
              <button
                key={card.title}
                ref={ref}
                className="hero-card"
                style={{
                  background: 'rgba(0,0,0,0.7)',
                  borderRadius: '16px',
                  padding: 0,
                  color: '#fff',
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  textAlign: 'center',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  transition: 'transform 0.2s, border 0.2s',
                  willChange: 'transform',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  if (card.title === 'ONE PIECE') {
                    navigate('/onepiece');
                  } else if (card.title === 'MY HERO ACADEMIA') {
                    navigate('/mhagame');
                  } else if (card.title === 'BLEACH') {
                    navigate('/bleachgame');
                  }
                }}
              >
                <div
                  ref={shineRef}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                    zIndex: 1,
                  }}
                />
                <video
                  src={card.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: '100%', height: '70%', objectFit: 'cover', borderRadius: '10px 10px 0 0', marginBottom: '0', zIndex: 2 }}
                />
                <h2 style={{ margin: 0, fontSize: '1.2rem', letterSpacing: '2px', textShadow: '0 2px 8px #000, 0 0 8px #00ffe7', height: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>{card.title}</h2>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
