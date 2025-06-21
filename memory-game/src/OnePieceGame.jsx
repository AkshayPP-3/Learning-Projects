import React, { useState } from 'react';
import onepiece1 from './assets/OnePiece/onepiece1.jpg';
import onepiece2 from './assets/OnePiece/onepiece2.jpg';
import onepiece3 from './assets/OnePiece/onepiece3.jpg';
import onepiece4 from './assets/OnePiece/onepiece4.jpg';
import onepiece5 from './assets/OnePiece/onepiece5.jpg';

const levels = [
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
];

const onePieceImages = [onepiece1, onepiece2, onepiece3, onepiece4, onepiece5];

// shuffle
function shuffleArray(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


const OnePieceGame = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [hoveredLevel, setHoveredLevel] = useState(null);
  const [score, setScore] = useState(0);
  const [cards, setCards] = useState(onePieceImages.map((img, i) => ({ img, flipped: false, id: i })));
  const [isFlipping, setIsFlipping] = useState(false);
  const [clickedIds, setClickedIds] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  // Reset handler
  const handleReset = () => {
    setCards(onePieceImages.map((img, i) => ({ img, flipped: false, id: i })));
    setScore(0);
    setClickedIds([]);
    setGameOver(false);
    setWin(false);
    setIsFlipping(false);
  };

  // Reset cards and game state when level changes
  React.useEffect(() => {
    if (selectedLevel === 'easy') {
      setCards(onePieceImages.map((img, i) => ({ img, flipped: false, id: i })));
      setScore(0);
      setClickedIds([]);
      setGameOver(false);
      setWin(false);
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
    setScore(newClicked.length);
    if (newClicked.length === onePieceImages.length) {
      setWin(true);
      return;
    }
    setIsFlipping(true);
    setCards(prev => prev.map(card => ({ ...card, flipped: true })));
    setTimeout(() => {
      setCards(prev => shuffleArray(prev.map(card => ({ ...card, flipped: false }))));
      setIsFlipping(false);
    }, 1000);
  };

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
        position: 'relative',
      }}>
        {/* Simple Win/Lose Message */}
        {gameOver && (
          <div style={{ color: 'red', fontWeight: 700, fontSize: '2rem', margin: '16px 0' }}>Game Over! You clicked the same card twice.</div>
        )}
        {win && (
          <div style={{ color: '#ffe066', fontWeight: 700, fontSize: '2rem', margin: '16px 0' }}>You Win! You clicked all cards once!</div>
        )}
        {/* Reset Button for Game Over or Win */}
        {(gameOver || win) && (
          <button onClick={handleReset} style={{
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
        )}
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
        {/* Score and Total Cards display for Easy level */}
        {selectedLevel === 'easy' && (
          <div style={{ marginTop: '10px', marginBottom: '10px', color: '#fff', fontWeight: 500, fontSize: '1.2rem', display: 'flex', justifyContent: 'center', gap: '32px' }}>
            <div>Current Score: {score}</div>
            <div>Total Cards: {onePieceImages.length}</div>
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
                    <img src={card.img} alt={`One Piece ${card.id + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
      </div>
    </div>
  );
};

export default OnePieceGame;
