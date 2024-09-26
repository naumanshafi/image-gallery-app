import React, { useRef, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, firestore } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../css/ImageUpload.css';

function ImageUpload({ setImages, setProgress, fetchImages }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadedFilePreview, setUploadedFilePreview] = useState(null);
  const [uploadedFileURL, setUploadedFileURL] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileSize, setFileSize] = useState(null);
  const [progress, updateProgress] = useState(0);

  // Handle drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    setFileSize((file.size / (1024 * 1024)).toFixed(2));
    setUploadedFilePreview(URL.createObjectURL(file));
    handleUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Handle file selection via input
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    // Set file size in MB
    setFileSize((file.size / (1024 * 1024)).toFixed(2));
    setUploadedFilePreview(URL.createObjectURL(file));
    handleUpload(file);
  };

  // Handle upload process
  const handleUpload = (file) => {
    if (!file) return;
    setUploading(true);
    setUploadComplete(false);

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progressValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressValue);
        updateProgress(progressValue);
      },
      (error) => {
        console.error('Upload failed:', error);
        setUploading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('File available at:', downloadURL); 
          setUploadedFileURL(downloadURL);
          setImages((prev) => [...prev, downloadURL]);
          await addDoc(collection(firestore, 'images'), { url: downloadURL });
          setUploading(false);
          setUploadComplete(true);
          fetchImages();
        } catch (error) {
          console.error('Error getting download URL:', error);
          setUploading(false);
        }
      }
    );
  };

  // Reset state to initial values
  const handleUploadMore = () => {
    setUploading(false);
    setUploadComplete(false);
    setUploadedFilePreview(null);
    setUploadedFileURL(null);
    setFileSize(null);
    updateProgress(0);  // Reset progress
    setProgress(0);  // Reset parent progress if needed
  };

  // Trigger file input click
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="upload-container">
      <h2 className="upload-title">Upload In A Snap</h2>

      {uploading ? (
        <div className="upload-progress-container upload-dropzone">
        <p className="uploading-text">Uploading Your Photo</p>
          {uploadedFilePreview && (
            <div className="image-preview-container">
              <img src={uploadedFilePreview} alt="Uploaded file preview" className="uploaded-image" />
            </div>
          )}
          <p className="picture-uploading-text">Picture Uploading</p>
          <p className="file-size-text">Size - {fileSize}MB</p>
          <div className="upload-progress-bar">
            <div className="upload-progress" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      ) : uploadComplete ? (
        <div className="upload-success upload-dropzone">
          <img src="/assets/vectors/upload.svg" alt="Upload Success" />
          <p>Your Photo has been Uploaded Successfully</p>
          <img src={uploadedFileURL} alt="Uploaded file" className="uploaded-image" />
          <button className="upload-more-button" onClick={handleUploadMore}>Upload More</button>
        </div>
      ) : (
        <div
          className={`upload-dropzone ${isDragging ? 'drag-over' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {isDragging ? (
            <div className="drop-here">
              <img className="drop-here-icon" src="/assets/vectors/drag_drop.svg" alt="Drop Here" />
              <p className="drop-here-text">Drop Here</p>
            </div>
          ) : (
            <>
              <div className="tablerdrag-drop">
                <div className="upload-drag-icon">
                  <img className="upload-vector" src="/assets/vectors/click.svg" alt="vector" />
                </div>
                <img className="upload-drag-img" src="/assets/vectors/frame.svg" alt="drag and drop" />
              </div>
              <div className="upload-button" onClick={handleButtonClick}>
                <input
                  type="file"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                />
                <span className="upload-button-text">Upload Image</span>
              </div>
              <div className="upload-footer">
                <p className="upload-footer-text">or drag and drop images</p>
                <span className="upload-footer-subtext">Paste image or Ctrl + V</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
