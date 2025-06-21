import React, { useState } from 'react';
import mha1 from './assets/Mha/mha1.jpg';
import mha2 from './assets/Mha/mha2.jpg';
import mha3 from './assets/Mha/mha3.jpg';
import mha4 from './assets/Mha/mha4.jpg';
import mha5 from './assets/Mha/mha5.jpg';

const levels = [
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
];

const mhaImages = [mha1, mha2, mha3, mha4, mha5];

const MhaGame = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [hoveredLevel, setHoveredLevel] = useState(null);
  const [cards, setCards] = useState(mhaImages.map((img, i) => ({ img, id: i })));

  React.useEffect(() => {
    if (selectedLevel === 'easy') {
      setCards(mhaImages.map((img, i) => ({ img, id: i })));
    }
  }, [selectedLevel]);
  
  return (
    <div style={{ minHeight: '100vh', minWidth: '100vw', background: '#2DC7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <div style={{
        background: 'rgba(0,0,0,0.6)',
        padding: '32px',
        borderRadius: '16px',
        boxShadow: '0 4px 32px #000a',
        color: '#fff',
        textAlign: 'center',
        minWidth: '340px',
      }}>
        <h1 style={{ fontFamily: 'One Piece, Impact, Arial', fontSize: '2.5rem', letterSpacing: '2px', color: '#ffe066', textShadow: '2px 2px 8px #000, 0 0 12px #00ffe7' }}>
            CHOOSE YOUR LEVEL
        </h1>
        <div style={{ margin: '32px 0 16px', display: 'flex', justifyContent: 'center', gap: '18px' }}>
          {levels.map((level) => {
            const isSelected = selectedLevel === level.value;
            const isHovered = hoveredLevel === level.value;
            return (
              <button
                key={level.value}
                onClick={() => setSelectedLevel(level.value)}
                onMouseEnter={() => setHoveredLevel(level.value)}
                onMouseLeave={() => setHoveredLevel(null)}
                style={{
                  padding: '10px 28px',
                  fontSize: '1.1rem',
                  borderRadius: '8px',
                  border: isSelected ? '2px solid #ffe066' : isHovered ? '2px solid #fff' : '2px solid #00ffe7',
                  background: isSelected ? '#ffe066' : isHovered ? '#fff' : '#00ffe7',
                  color: isSelected ? '#222' : isHovered ? '#00ffe7' : '#fff',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 0 12px #ffe06688' : isHovered ? '0 0 12px #fff8' : '0 0 8px #00ffe788',
                  transition: 'all 0.2s',
                  outline: 'none',
                }}
              >
                {level.label}
              </button>
            );
          })}
        </div>
        {selectedLevel && (
          <div style={{ marginTop: '18px', color: '#ffe066', fontWeight: 600, fontSize: '2.2rem' }}>
            Selected Level: {levels.find(l => l.value === selectedLevel).label}
          </div>
        )}
        {selectedLevel === 'easy' && (
          <div
            style={{ display: 'flex', justifyContent: 'center', gap: '36px', flexWrap: 'wrap', marginTop: 24 }}
          >
            {cards.map((card) => (
              <div
                key={card.id}
                className="flip-card"
                style={{ width: 200, height: 280, perspective: 800, borderRadius: 16, boxShadow: '0 4px 16px #0006', margin: 0 }}
              >
                <div
                  className="flip-card-inner"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 16,
                    position: 'relative',
                  }}
                >
                  {/* Card Front (Image) */}
                  <div
                    className="flip-card-front"
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: 16,
                      overflow: 'hidden',
                    }}
                  >
                    <img src={card.img} alt={`MHA ${card.id + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MhaGame;
