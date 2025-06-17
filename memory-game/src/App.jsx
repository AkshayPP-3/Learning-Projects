import { HashLoader } from 'react-spinners';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import HeroPage from './HeroPage';
import './App.css';
import bgMusic from './assets/Audio/guts.mp3';

function LoaderScreen() {
  const navigate = useNavigate();
  return (
    <div className="loader-container" onClick={() => navigate('/home')} style={{cursor: 'pointer'}}>
      <HashLoader color="#36d7b7" size={50} speedMultiplier={1.2} />
      <h1 className="click-anywhere">Click anywhere to start the game</h1>
    </div>
  );
}

function App() {
  return (
    <>
      <audio src={bgMusic} autoPlay loop />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoaderScreen />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/heropage" element={<HeroPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
