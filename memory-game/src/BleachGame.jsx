import React, { useState } from 'react';
import bleach1 from './assets/Bleach/bleach1.jpg';
import bleach2 from './assets/Bleach/bleach2.jpg';
import bleach3 from './assets/Bleach/bleach3.jpg';
import bleach4 from './assets/Bleach/bleach4.jpg';
import bleach5 from './assets/Bleach/bleach5.jpg';
import bleach6 from './assets/Bleach/bleach6.jpg';
import bleach7 from './assets/Bleach/bleach7.jpg';
import bleach8 from './assets/Bleach/bleach8.jpg';
import bleach9 from './assets/Bleach/bleach9.jpg';
import bleach10 from './assets/Bleach/bleach10.jpg';
import bleach11 from './assets/Bleach/bleach11.jpg';
import bleach12 from './assets/Bleach/bleach12.jpg';
import bleach13 from './assets/Bleach/bleach13.jpg';
import bleach14 from './assets/Bleach/bleach14.jpg';
import bleach15 from './assets/Bleach/bleach15.jpg';
import bleach16 from './assets/Bleach/bleach16.jpg';
import bleach17 from './assets/Bleach/bleach17.jpg';
import bleach18 from './assets/Bleach/bleach18.jpg';
import bleach19 from './assets/Bleach/bleach19.jpg';
import bleach20 from './assets/Bleach/bleach20.jpg';
import bleach21 from './assets/Bleach/bleach21.jpg';
import bleach22 from './assets/Bleach/bleach22.jpg';
import bleach23 from './assets/Bleach/bleach23.jpg';
import bleach24 from './assets/Bleach/bleach24.jpg';
import bleach25 from './assets/Bleach/bleach25.jpg';

const levels = [
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
];

const bleachImages = [bleach1, bleach2, bleach3, bleach4, bleach5];
const bleachImagesMedium = [bleach6, bleach7, bleach8, bleach9, bleach10, bleach11, bleach12, bleach13];
const bleachImagesHard = [
  bleach14, bleach15, bleach16, bleach17, bleach18, bleach19,
  bleach20, bleach21, bleach22, bleach23, bleach24, bleach25
];

function shuffleArray(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const winGif = "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmF0cThhcGg3YmxiaDYzbndoYTJsemljN3dmdm13cXB3Z2VzdXltMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8uaOiZk0xg2Na/giphy.gif"; // Bleach win gif
const loseGif = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHE3ZGRoamQyMTlhajR6eHVkdHU3aGpiYmc5ajUzbnVobDF1Ynh5OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PBdB8xvj1cRD43sZMX/giphy.gif"; // Bleach lose gif

const BleachGame = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [hoveredLevel, setHoveredLevel] = useState(null);
  const [cards, setCards] = useState(bleachImages.map((img, i) => ({ img, flipped: false, id: i })));
  const [visibleCards, setVisibleCards] = useState([]);
  const [isFlipping, setIsFlipping] = useState(false);
  const [clickedIds, setClickedIds] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  // Preload all medium and hard images on mount
  React.useEffect(() => {
    bleachImagesMedium.forEach(img => {
      const image = new window.Image();
      image.src = img;
    });
    bleachImagesHard.forEach(img => {
      const image = new window.Image();
      image.src = img;
    });
  }, []);

  React.useEffect(() => {
    if (selectedLevel === 'easy') {
      setCards(bleachImages.map((img, i) => ({ img, flipped: false, id: i })));
      setClickedIds([]);
      setGameOver(false);
      setWin(false);
      setVisibleCards([]);
    } else if (selectedLevel === 'medium') {
      setCards(bleachImagesMedium.map((img, i) => ({ img, flipped: false, id: i })));
      setClickedIds([]);
      setGameOver(false);
      setWin(false);
      setVisibleCards(shuffleArray(bleachImagesMedium.map((img, i) => ({ img, flipped: false, id: i }))).slice(0, 5));
    } else if (selectedLevel === 'hard') {
      setCards(bleachImagesHard.map((img, i) => ({ img, flipped: false, id: i })));
      setClickedIds([]);
      setGameOver(false);
      setWin(false);
      setVisibleCards(shuffleArray(bleachImagesHard.map((img, i) => ({ img, flipped: false, id: i }))).slice(0, 5));
    }
  }, [selectedLevel]);

  const handleCardClick = (id) => {
    if (isFlipping || gameOver || win) return;
    if (clickedIds.includes(id)) {
      setGameOver(true);
      return;
    }
    const newClicked = [...clickedIds, id];
    setClickedIds(newClicked);
    if (selectedLevel === 'medium') {
      if (newClicked.length === bleachImagesMedium.length) {
        setWin(true);
        return;
      }
      setIsFlipping(true);
      setVisibleCards(prev => prev.map(card => ({ ...card, flipped: true })));
      setTimeout(() => {
        const shuffled = shuffleArray(bleachImagesMedium.map((img, i) => ({ img, flipped: false, id: i })));
        setVisibleCards(shuffled.slice(0, 5));
        setIsFlipping(false);
      }, 1000);
    } else if (selectedLevel === 'hard') {
      if (newClicked.length === bleachImagesHard.length) {
        setWin(true);
        return;
      }
      setIsFlipping(true);
      setVisibleCards(prev => prev.map(card => ({ ...card, flipped: true })));
      setTimeout(() => {
        const shuffled = shuffleArray(bleachImagesHard.map((img, i) => ({ img, flipped: false, id: i })));
        setVisibleCards(shuffled.slice(0, 5));
        setIsFlipping(false);
      }, 1000);
    } else {
      if (newClicked.length === cards.length) {
        setWin(true);
        return;
      }
      setIsFlipping(true);
      setCards(prev => prev.map(card => ({ ...card, flipped: true })));
      setTimeout(() => {
        setCards(prev => shuffleArray(prev.map(card => ({ ...card, flipped: false }))));

        setIsFlipping(false);
      }, 1000);
    }
  };

  return (
    <>
      {/* Popup Modal for Win and Lose */}
      {(gameOver || win) && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}>
          <div style={{
            background: '#222',
            borderRadius: 24,
            padding: '36px 32px 28px 32px',
            boxShadow: '0 8px 40px #000a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 340,
            minWidth: 260,
            position: 'relative',
          }}>
            <img src={gameOver ? loseGif : winGif} alt={gameOver ? 'Game Over' : 'You Win'} style={{ width: 180, height: 120, objectFit: 'cover', borderRadius: 12, marginBottom: 18, boxShadow: '0 2px 16px #0008' }} />
            <div style={{ color: gameOver ? 'red' : '#ffe066', fontWeight: 800, fontSize: '2rem', marginBottom: 12, textAlign: 'center', lineHeight: 1.4 }}>
              {selectedLevel === 'easy' ? (
                gameOver
                  ? 'You lost this round! Every Soul Reaper needs more training. Try again!'
                  : 'You protected Karakura Town! Easy mode complete!'
              ) : selectedLevel === 'medium' ? (
                gameOver
                  ? 'You lost in the Soul Society challenge! The path is tough, but you can do it!'
                  : 'You mastered the Soul Society challenge! Medium mode complete!'
              ) : (
                gameOver
                  ? 'Defeated in the final battle! Only the strongest Soul Reapers prevail. Sharpen your memory and try again!'
                  : 'Victory! Your memory is as sharp as Zangetsu!'
              )}
            </div>
            {selectedLevel === 'easy' && win ? (
              <button
                onClick={() => {
                  setSelectedLevel('medium');
                  setCards(bleachImagesMedium.map((img, i) => ({ img, flipped: false, id: i })));
                  setClickedIds([]);
                  setGameOver(false);
                  setWin(false);
                  setVisibleCards(shuffleArray(bleachImagesMedium.map((img, i) => ({ img, flipped: false, id: i }))).slice(0, 5));
                }}
                style={{
                  marginTop: 8,
                  padding: '10px 32px',
                  fontSize: '1.1rem',
                  borderRadius: 8,
                  border: 'none',
                  background: '#00ffe7',
                  color: '#222',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px #0006',
                  transition: 'all 0.2s',
                  marginBottom: 8,
                }}
              >
                 Next Level
              </button>
            ) : null}
            {selectedLevel === 'medium' && win ? (
              <button
                onClick={() => {
                  setSelectedLevel('hard');
                  setCards(bleachImagesHard.map((img, i) => ({ img, flipped: false, id: i })));
                  setClickedIds([]);
                  setGameOver(false);
                  setWin(false);
                  setVisibleCards(shuffleArray(bleachImagesHard.map((img, i) => ({ img, flipped: false, id: i }))).slice(0, 5));
                }}
                style={{
                  marginTop: 8,
                  padding: '10px 32px',
                  fontSize: '1.1rem',
                  borderRadius: 8,
                  border: 'none',
                  background: '#00ffe7',
                  color: '#222',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px #0006',
                  transition: 'all 0.2s',
                  marginBottom: 8,
                }}
              >
                Next Level
              </button>
            ) : null}
            <button onClick={() => {
              setCards(bleachImages.map((img, i) => ({ img, flipped: false, id: i }))); 
              setClickedIds([]);
              setGameOver(false);
              setWin(false);
            }} style={{
              marginTop: 8,
              padding: '10px 32px',
              fontSize: '1.1rem',
              borderRadius: 8,
              border: 'none',
              background: '#ffe066',
              color: '#222',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px #0006',
              transition: 'all 0.2s',
            }}>Play Again</button>
          </div>
        </div>
      )}
      <div style={{ minHeight: '100vh', minWidth: '100vw', background: '#2DC7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{
          background: 'rgba(0,0,0,0.6)',
          padding: '32px',
          borderRadius: '16px',
          boxShadow: '0 4px 32px #000a',
          color: '#fff',
          textAlign: 'center',
          minWidth: '340px',
          position: 'relative',
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
            <div style={{ marginTop: '10px', color: '#ffe066', fontWeight: 600, fontSize: '2.2rem', marginBottom: '10px' }}>
              Selected Level: {levels.find(l => l.value === selectedLevel).label}
            </div>
          )}
          {selectedLevel === 'easy' && (
            <div style={{ marginTop: '0px', marginBottom: '10px', color: '#fff', fontWeight: 500, fontSize: '1.2rem', display: 'flex', justifyContent: 'center', gap: '32px' }}>
              <div>Current Score: {clickedIds.length}</div>
              <div>Total Cards: {cards.length}</div>
            </div>
          )}
          {selectedLevel === 'easy' && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '36px', flexWrap: 'wrap', marginTop: 24 }}>
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="flip-card"
                  style={{ width: 200, height: 280, perspective: 800, borderRadius: 16, boxShadow: '0 4px 16px #0006', margin: 0 }}
                  onClick={e => { e.stopPropagation(); handleCardClick(card.id); }}
                >
                  <div
                    className="flip-card-inner"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 16,
                      transition: 'transform 0.5s',
                      transformStyle: 'preserve-3d',
                      position: 'relative',
                      transform: card.flipped ? 'rotateY(180deg)' : 'none',
                    }}
                  >
                    {/* Card Front (Image) */}
                    <div
                      className="flip-card-front"
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        borderRadius: 16,
                        overflow: 'hidden',
                      }}
                    >
                      <img src={card.img} alt={`Bleach ${card.id + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    {/* Card Back (just yellow color) */}
                    <div
                      className="flip-card-back"
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        transform: 'rotateY(180deg)',
                        background: '#ffe066',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 16,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {selectedLevel === 'easy' && gameOver && null}
          {selectedLevel === 'easy' && win && null}
          {selectedLevel === 'medium' && (
            <div style={{ marginTop: '0px', marginBottom: '10px', color: '#fff', fontWeight: 500, fontSize: '1.2rem', display: 'flex', justifyContent: 'center', gap: '32px' }}>
              <div>Current Score: {clickedIds.length}</div>
              <div>Total Cards: {bleachImagesMedium.length}</div>
            </div>
          )}
          {selectedLevel === 'medium' && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '36px', flexWrap: 'wrap', marginTop: 24 }}>
              {visibleCards.map((card) => (
                <div
                  key={card.id}
                  className="flip-card"
                  style={{ width: 200, height: 280, perspective: 800, borderRadius: 16, boxShadow: '0 4px 16px #0006', margin: 0 }}
                  onClick={e => { e.stopPropagation(); handleCardClick(card.id); }}
                >
                  <div
                    className="flip-card-inner"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 16,
                      transition: 'transform 0.5s',
                      transformStyle: 'preserve-3d',
                      position: 'relative',
                      transform: card.flipped ? 'rotateY(180deg)' : 'none',
                    }}
                  >
                    {/* Card Front (Image) */}
                    <div
                      className="flip-card-front"
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        borderRadius: 16,
                        overflow: 'hidden',
                      }}
                    >
                      <img src={card.img} alt={`Bleach ${card.id + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    {/* Card Back (just yellow color) */}
                    <div
                      className="flip-card-back"
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        transform: 'rotateY(180deg)',
                        background: '#ffe066',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 16,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {selectedLevel === 'medium' && gameOver && null}
          {selectedLevel === 'medium' && win && null}
          {selectedLevel === 'hard' && (
            <div style={{ marginTop: '0px', marginBottom: '10px', color: '#fff', fontWeight: 500, fontSize: '1.2rem', display: 'flex', justifyContent: 'center', gap: '32px' }}>
              <div>Current Score: {clickedIds.length}</div>
              <div>Total Cards: {bleachImagesHard.length}</div>
            </div>
          )}
          {selectedLevel === 'hard' && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '36px', flexWrap: 'wrap', marginTop: 24 }}>
              {visibleCards.map((card) => (
                <div
                  key={card.id}
                  className="flip-card"
                  style={{ width: 200, height: 280, perspective: 800, borderRadius: 16, boxShadow: '0 4px 16px #0006', margin: 0 }}
                  onClick={e => { e.stopPropagation(); handleCardClick(card.id); }}
                >
                  <div
                    className="flip-card-inner"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 16,
                      transition: 'transform 0.5s',
                      transformStyle: 'preserve-3d',
                      position: 'relative',
                      transform: card.flipped ? 'rotateY(180deg)' : 'none',
                    }}
                  >
                    {/* Card Front (Image) */}
                    <div
                      className="flip-card-front"
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        borderRadius: 16,
                        overflow: 'hidden',
                      }}
                    >
                      <img src={card.img} alt={`Bleach ${card.id + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    {/* Card Back (just yellow color) */}
                    <div
                      className="flip-card-back"
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        transform: 'rotateY(180deg)',
                        background: '#ffe066',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 16,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {selectedLevel === 'hard' && gameOver && null}
          {selectedLevel === 'hard' && win && null}
        </div>
      </div>
    </>
  );
};

export default BleachGame;
