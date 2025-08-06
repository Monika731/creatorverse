// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddCreator from './pages/AddCreator';
import CreatorDetails from './pages/CreatorDetails';
import AboutCreator from './pages/AboutCreator';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddCreator />} />
        <Route path="/creator/:id" element={<CreatorDetails />} />
        <Route path="/about/:id" element={<AboutCreator />} />
      </Routes>
    </Router>
  );
}

export default App;
