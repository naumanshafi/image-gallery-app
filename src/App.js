import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ImageUpload from './components/ImageUpload';
import ImageGallery from './components/ImageGallery';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { firestore } from './firebase';
import '../src/css/App.css';

function App() {
  const [images, setImages] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch images from Firestore based on upload date and time
  const fetchImages = async () => {
    try {
      const imagesQuery = query(collection(firestore, 'images'), orderBy('uploadDate', 'asc'));
      const querySnapshot = await getDocs(imagesQuery);
      const getImages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        url: doc.data().url,
        uploadDate: doc.data().uploadDate,
      }));
      setImages(getImages);
      setTotalPages(Math.ceil(getImages.length / 6));
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };
  
  // Fetch images when component mounts
  useEffect(() => {
    fetchImages();
  }, []);

  // Handle pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleImageDelete = (imageId) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== imageId));
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
          handleImageDelete={handleImageDelete}
        />
      </div>
    </div>
  );
}

export default App;
