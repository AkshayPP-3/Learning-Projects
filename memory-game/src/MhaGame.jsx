import React, { useState } from 'react';
import mha1 from './assets/Mha/mha1.jpg';
import mha2 from './assets/Mha/mha2.jpg';
import mha3 from './assets/Mha/mha3.jpg';
import mha4 from './assets/Mha/mha4.jpg';
import mha5 from './assets/Mha/mha5.jpg';
import mha6 from './assets/Mha/mha6.jpg';
import mha7 from './assets/Mha/mha7.jpg';
import mha8 from './assets/Mha/mha8.jpg';
import mha9 from './assets/Mha/mha9.jpg';
import mha10 from './assets/Mha/mha10.jpg';
import mha11 from './assets/Mha/mha11.jpg';
import mha12 from './assets/Mha/mha12.jpg';
import mha13 from './assets/Mha/mha13.jpg';
import mha14 from './assets/Mha/mha14.jpg';
import mha15 from './assets/Mha/mha15.jpg';
import mha16 from './assets/Mha/mha16.jpg';
import mha17 from './assets/Mha/mha17.jpg';
import mha18 from './assets/Mha/mha18.jpg';
import mha19 from './assets/Mha/mha19.jpg';
import mha20 from './assets/Mha/mha20.jpg';
import mha21 from './assets/Mha/mha21.jpg';
import mha22 from './assets/Mha/mha22.jpg';
import mha23 from './assets/Mha/mha23.jpg';
import mha24 from './assets/Mha/mha24.jpg';
import mha25 from './assets/Mha/mha25.jpg';

const levels = [
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
];

const mhaImages = [mha1, mha2, mha3, mha4, mha5];
const mhaImagesMedium = [mha6, mha7, mha8, mha9, mha10, mha11, mha12, mha13];
const mhaImagesHard = [
  mha14, mha15, mha16, mha17, mha18, mha19,
  mha20, mha21, mha22, mha23, mha24, mha25
];

function shuffleArray(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const winGif = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnBzOXBlamJnazVmM3V1azAzeXBxZTVwemk1NmxnMDFxN3J5dHA3YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/g1EGGf9NymomY/giphy.gif"; // MHA win gif
const loseGif = "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3FvcXJmaGszbzF0Y3QzYjVmMDAwd2phNmM3YnB5MGdqZjQ0dTFsOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT0GqoSzU4EimnW6qY/giphy.gif"; // MHA lose gif
const MhaGame = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [hoveredLevel, setHoveredLevel] = useState(null);
  const [cards, setCards] = useState(mhaImages.map((img, i) => ({ img, flipped: false, id: i })));
  const [visibleCards, setVisibleCards] = useState([]);
  const [isFlipping, setIsFlipping] = useState(false);
  const [clickedIds, setClickedIds] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  // Preload all medium and hard images on mount
  React.useEffect(() => {
    mhaImagesMedium.forEach(img => {
      const image = new window.Image();
      image.src = img;
    });
    mhaImagesHard.forEach(img => {
      const image = new window.Image();
      image.src = img;
    });
  }, []);

  React.useEffect(() => {
    if (selectedLevel === 'easy') {
      setCards(mhaImages.map((img, i) => ({ img, flipped: false, id: i })));
      setClickedIds([]);
      setGameOver(false);
      setWin(false);
      setVisibleCards([]);
    } else if (selectedLevel === 'medium') {
      setCards(mhaImagesMedium.map((img, i) => ({ img, flipped: false, id: i })));
      setClickedIds([]);
      setGameOver(false);
      setWin(false);
      setVisibleCards(shuffleArray(mhaImagesMedium.map((img, i) => ({ img, flipped: false, id: i }))).slice(0, 5));
    } else if (selectedLevel === 'hard') {
      setCards(mhaImagesHard.map((img, i) => ({ img, flipped: false, id: i })));
      setClickedIds([]);
      setGameOver(false);
      setWin(false);
      setVisibleCards(shuffleArray(mhaImagesHard.map((img, i) => ({ img, flipped: false, id: i }))).slice(0, 5));
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
      if (newClicked.length === mhaImagesMedium.length) {
        setWin(true);
        return;
      }
      setIsFlipping(true);
      setVisibleCards(prev => prev.map(card => ({ ...card, flipped: true })));
      setTimeout(() => {
        const shuffled = shuffleArray(mhaImagesMedium.map((img, i) => ({ img, flipped: false, id: i })));
        setVisibleCards(shuffled.slice(0, 5));
        setIsFlipping(false);
      }, 1000);
    } else if (selectedLevel === 'hard') {
      if (newClicked.length === mhaImagesHard.length) {
        setWin(true);
        return;
      }
      setIsFlipping(true);
      setVisibleCards(prev => prev.map(card => ({ ...card, flipped: true })));
      setTimeout(() => {
        const shuffled = shuffleArray(mhaImagesHard.map((img, i) => ({ img, flipped: false, id: i })));
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
      {/* Popup Modal for Win and Lose - move outside main container */}
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
              {gameOver
                ? 'Defeated this round! Even Deku stumbles. Try again, future Hero!'
                : 'Victory! You’ve got a memory as strong as All Might!'}
            </div>
            <button onClick={() => {
              setCards(mhaImages.map((img, i) => ({ img, flipped: false, id: i })));
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
            <div style={{ marginTop: '10px', marginBottom: '10px', color: '#fff', fontWeight: 500, fontSize: '1.2rem', display: 'flex', justifyContent: 'center', gap: '32px' }}>
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
                      <img src={card.img} alt={`MHA ${card.id + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
            <div style={{ marginTop: '10px', marginBottom: '10px', color: '#fff', fontWeight: 500, fontSize: '1.2rem', display: 'flex', justifyContent: 'center', gap: '32px' }}>
              <div>Current Score: {clickedIds.length}</div>
              <div>Total Cards: {mhaImagesMedium.length}</div>
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
                      <img src={card.img} alt={`MHA ${card.id + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
            <div style={{ marginTop: '10px', marginBottom: '10px', color: '#fff', fontWeight: 500, fontSize: '1.2rem', display: 'flex', justifyContent: 'center', gap: '32px' }}>
              <div>Current Score: {clickedIds.length}</div>
              <div>Total Cards: {mhaImagesHard.length}</div>
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
                      <img src={card.img} alt={`MHA ${card.id + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

export default MhaGame;
