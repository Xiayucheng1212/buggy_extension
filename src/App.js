import './App.css';
import HomePage from './components/HomePage';
import AddPage from './components/AddPage';
import { Routes, Route } from 'react-router-dom'
import DraftPage from './components/DraftPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/draft" element={<DraftPage />} />
      </Routes>
    </>
  );
}

export default App;
