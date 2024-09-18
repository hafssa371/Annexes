import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import UserManager from './components/UserManager';
import PostManager from './components/PostManager';
import NotFound from './components/NotFound';


function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="content">
          <header className="app-header">
          <h1>GesApp</h1>
            <div className="search-bar">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Rechercher..."
              />
            </div>
          </header>
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/users" element={<UserManager />} />
              <Route path="/users/:id" element={<UserManager />} />
              <Route path="/posts" element={<PostManager />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;



