import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ImageUpload from './components/ImageUpload'; // Importing ImageUpload component

function App() {
  // State to store uploaded images and progress
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);

  // Placeholder function for fetching images
  const fetchImages = () => {
    // Logic to fetch images from Firebase (or elsewhere) can be added here
  };

  return (
    <div className="App">
      <img className="background-image" src="/assets/vectors/background.svg" alt="background vector" />
      <Navbar />
      <div className="content">
        {/* Including the ImageUpload component and passing the necessary props */}
        <ImageUpload 
          setImages={setImages} 
          setProgress={setProgress} 
          fetchImages={fetchImages}
        />
        {/* You can also display progress or an image gallery here if needed */}
      </div>
    </div>
  );
}

export default App;
