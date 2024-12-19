// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import SettingsPage from './components/SettingsPage';
import GamePage from './components/GamePage';
import ResultPage from './components/ResultPage';
import SubmitPage from './components/SubmitPage';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from './theme';
import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/submit" element={<SubmitPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;