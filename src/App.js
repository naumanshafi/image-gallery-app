import React from 'react';
import './App.css';
import Navbar from './components/Navbar';  // Importing the Navbar component

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        {/* This is a placeholder for future components like ImageGallery, UploadSection, etc. */}
        <h1>Welcome to PhotoDrag</h1>
      </div>
    </div>
  );
}

export default App;
