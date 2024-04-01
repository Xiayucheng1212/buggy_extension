import './App.css';
import { openDB } from 'idb';
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage';
import AddPage from './components/AddPage';
import EditPage from './components/EditPage';
import DraftPage from './components/DraftPage';
import Navbar from './components/Navbar';
import DBContext from './AppContext';
import { useState } from 'react';

const App = () => {
  var [draftCount, setDraftCount] = useState(0);
  let dbProm = openDB('buggy', 1, {
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
    <div className="w-[350px] h-[500px] px-[30px] pt-[30px] pb-10 bg-white flex-col justify-start items-center gap-1.5 inline-flex">
      <DBContext.Provider value={{ dbProm: dbProm, draftCount, setDraftCount }}>
        <Navbar />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/draft" element={<DraftPage />} />
          <Route path="/edit/:id" element={<EditPage/>} />
        </Routes>
      </DBContext.Provider>
    </div>
  );
}

export default App;
