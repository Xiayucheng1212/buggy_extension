import { useEffect, useState } from 'react';
import { openDB } from 'idb';
import { Routes, Route, useLocation } from 'react-router-dom'

import HomePage from './components/HomePage';
import AddPage from './components/AddPage';
import EditPage from './components/EditPage';
import DraftPage from './components/DraftPage';
import Navbar from './components/Navbar';
import DBContext from './AppContext';

import './App.css';

const App = () => {
  const [draftCount, setDraftCount] = useState(0);
  const [searchBarInput, setSearchBarInput] = useState("");
  const [isHomePage, setIsHomePage] = useState(true);
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

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setIsHomePage(true);
    } else {
      setIsHomePage(false);
    }
  }, [location]);

  return (
    <div className="w-[350px] h-[500px] p-[20px] bg-white flex-col justify-start items-center gap-1.5 inline-flex">
      <DBContext.Provider value={{ dbProm: dbProm, draftCount, setDraftCount, searchBarInput, setSearchBarInput }}>
        <Navbar isHomePage={isHomePage} />
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
