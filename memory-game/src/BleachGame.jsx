import React, { useState } from 'react';

const levels = [
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
];

const bleachImages = [
  '/assets/Bleach/bleach1.jpg', '/assets/Bleach/bleach2.jpg', '/assets/Bleach/bleach3.jpg', '/assets/Bleach/bleach4.jpg', '/assets/Bleach/bleach5.jpg'
];
const bleachImagesMedium = [
  '/assets/Bleach/bleach6.jpg', '/assets/Bleach/bleach7.jpg', '/assets/Bleach/bleach8.jpg', '/assets/Bleach/bleach9.jpg', '/assets/Bleach/bleach10.jpg', '/assets/Bleach/bleach11.jpg', '/assets/Bleach/bleach12.jpg', '/assets/Bleach/bleach13.jpg'
];
const bleachImagesHard = [
  '/assets/Bleach/bleach14.jpg', '/assets/Bleach/bleach15.jpg', '/assets/Bleach/bleach16.jpg', '/assets/Bleach/bleach17.jpg', '/assets/Bleach/bleach18.jpg', '/assets/Bleach/bleach19.jpg',
  '/assets/Bleach/bleach20.jpg', '/assets/Bleach/bleach21.jpg', '/assets/Bleach/bleach22.jpg', '/assets/Bleach/bleach23.jpg', '/assets/Bleach/bleach24.jpg', '/assets/Bleach/bleach25.jpg'
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
    // Helper to always include at least one unclicked card in the visible set
    function getVisibleWithUnclicked(allCards, clicked, count) {
      const unclicked = allCards.filter(card => !clicked.includes(card.id));
      let pool = shuffleArray(allCards);
      // If all cards are clicked, just return the first N
      if (unclicked.length === 0) return pool.slice(0, count);
      // Ensure at least one unclicked card is present
      const chosenUnclicked = shuffleArray(unclicked)[0];
      // Remove chosenUnclicked from pool to avoid duplicates
      pool = pool.filter(card => card.id !== chosenUnclicked.id);
      // Take (count-1) from pool, then add the chosenUnclicked
      const rest = pool.slice(0, count - 1);
      return shuffleArray([chosenUnclicked, ...rest]);
    }
    if (selectedLevel === 'medium') {
      if (newClicked.length === bleachImagesMedium.length) {
        setWin(true);
        return;
      }
      setIsFlipping(true);
      setVisibleCards(prev => prev.map(card => ({ ...card, flipped: true })));
      setTimeout(() => {
        const allCards = bleachImagesMedium.map((img, i) => ({ img, flipped: false, id: i }));
        setVisibleCards(getVisibleWithUnclicked(allCards, newClicked, 5));
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
        const allCards = bleachImagesHard.map((img, i) => ({ img, flipped: false, id: i }));
        setVisibleCards(getVisibleWithUnclicked(allCards, newClicked, 5));
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

  // For rendering, use visibleCards for medium/hard, cards for easy
  const renderCards = () => {
    if (selectedLevel === 'medium' || selectedLevel === 'hard') {
      return (
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
      );
    }
    // Easy level
    return (
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
                width: '100%','height': '100%',
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
    );
  };

  return (
    <div style={{ minHeight: '100vh', minWidth: '100vw', background: '#2DC7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        style={{
          position: 'fixed',
          top: 24,
          left: 1140,
          background: 'rgba(0,0,0,0.7)',
          color: '#ffe066',
          border: 'none',
          borderRadius: 8,
          padding: '10px 18px',
          fontSize: '1.2rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 100,
          boxShadow: '0 2px 8px #0006',
          outline: 'none',
          gap: 8,
          transition: 'background 0.2s, color 0.2s',
        }}
        onMouseOver={e => {
          e.currentTarget.style.background = '#ffe066';
          e.currentTarget.style.color = '#222';
          // Change SVG arrow color on hover
          const svg = e.currentTarget.querySelector('svg path');
          if (svg) svg.setAttribute('stroke', '#222');
        }}
        onMouseOut={e => {
          e.currentTarget.style.background = 'rgba(0,0,0,0.7)';
          e.currentTarget.style.color = '#ffe066';
          // Restore SVG arrow color
          const svg = e.currentTarget.querySelector('svg path');
          if (svg) svg.setAttribute('stroke', '#ffe066');
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 24 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#ffe066" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        Back
      </button>

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
          {selectedLevel === 'easy' && renderCards()}
          {selectedLevel === 'medium' && (
            <div style={{ marginTop: '10px', marginBottom: '10px', color: '#fff', fontWeight: 500, fontSize: '1.2rem', display: 'flex', justifyContent: 'center', gap: '32px' }}>
              <div>Current Score: {clickedIds.length}</div>
              <div>Total Cards: {bleachImagesMedium.length}</div>
            </div>
          )}
          {selectedLevel === 'medium' && renderCards()}
          {selectedLevel === 'hard' && (
            <div style={{ marginTop: '10px', marginBottom: '10px', color: '#fff', fontWeight: 500, fontSize: '1.2rem', display: 'flex', justifyContent: 'center', gap: '32px' }}>
              <div>Current Score: {clickedIds.length}</div>
              <div>Total Cards: {bleachImagesHard.length}</div>
            </div>
          )}
          {selectedLevel === 'hard' && renderCards()}
        </div>
      </div>
    </div>
  );
};

export default BleachGame;
