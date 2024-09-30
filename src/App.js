import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ImageUpload from './components/ImageUpload';
import ImageGallery from './components/ImageGallery';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { firestore } from './firebase';

function App() {
  // State to store uploaded images
  const [images, setImages] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch images from Firestore based on upload date and time
  const fetchImages = async () => {
    try {
      // Query images ordered by upload date (most recent first)
      const imagesQuery = query(collection(firestore, 'images'));
      const querySnapshot = await getDocs(imagesQuery);
      const getImages = querySnapshot.docs.map((doc) => doc.data().url);
      setImages(getImages);
      console.log(getImages);
      setTotalPages(Math.ceil(getImages.length / 6)); // Set total pages based on image count
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  // Fetch images when component mounts
  useEffect(() => {
    fetchImages();
  }, []); // Fetch once when the component mounts

  // Handle pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App">
      <img className="background-image" src="/assets/vectors/background.svg" alt="background vector" />
      <Navbar />
      <div className="content">
        <ImageUpload 
          setImages={setImages} 
          fetchImages={fetchImages}
        />
        <ImageGallery 
          images={images} 
          currentPage={currentPage}
          totalPages={totalPages}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      </div>
    </div>
  );
}

export default App;
