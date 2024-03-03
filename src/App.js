import './App.css';
import { openDB } from 'idb';
import HomePage from './components/HomePage';
import AddPage from './components/AddPage';
import EditPage from './components/EditPage';
import { Routes, Route } from 'react-router-dom'
import DraftPage from './components/DraftPage';
import DBContext from './DBContext';

function App() {
  var dbProm = openDB('buggy', 1, {
    upgrade(db) {
      db.createObjectStore('links', {
        keyPath: 'id',
        name: 'string',
        url: 'string',
        description: 'string',
        tags: 'array',
        autoIncrement: true
      });
      db.createObjectStore('tags', {
        keyPath: 'id',
        links: 'array',
        autoIncrement: true
      });
      db.createObjectStore('drafts', {
        keyPath: 'id',
        name: 'string',
        url: 'string',
        description: 'string',
        autoIncrement: true
      });
    }
  })

  return (
    <>
      <DBContext.Provider value={{ dbProm: dbProm }}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/draft" element={<DraftPage />} />
          <Route path="/edit/:id" element={<EditPage/>} />
        </Routes>
      </DBContext.Provider>
    </>
  );
}

export default App;
