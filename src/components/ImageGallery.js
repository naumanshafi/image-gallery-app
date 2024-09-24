import React, { useEffect, useState } from 'react';
import { storage } from '../firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

const ImageGallery = () => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const storageRef = ref(storage, 'images/');
    listAll(storageRef)
      .then((res) => {
        const promises = res.items.map((itemRef) => {
          return getDownloadURL(itemRef);
        });
        Promise.all(promises).then((urls) => setImageUrls(urls));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {imageUrls.map((url, index) => (
        <img key={index} src={url} alt={`Uploaded ${index}`} style={{ width: '200px', margin: '10px' }} />
      ))}
    </div>
  );
};

export default ImageGallery;
