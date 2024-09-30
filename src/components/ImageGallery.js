import React, { useState } from 'react';
import { ref, deleteObject } from 'firebase/storage';
import { doc, deleteDoc } from 'firebase/firestore';
import { storage, firestore } from '../firebase';
import '../css/ImageGallery.css';

function ImageGallery({ images, currentPage, totalPages, handleNextPage, handlePreviousPage, handleImageDelete }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleViewImage = (url) => {
    setSelectedImage(url);
    setIsImageLoaded(false);
    setIsModalOpen(true);
  };

  // Close the view modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // Open the delete modal
  const handleOpenDeleteModal = (image) => {
    setImageToDelete(image);
    setIsDeleteModalOpen(true);
  };  

  // Close the delete modal
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setImageToDelete(null);
  };

  // Confirm deletion of the image
  const handleConfirmDelete = async () => {
    try {
      if (imageToDelete) {
        const imageRef = ref(storage, imageToDelete.url);
        await deleteObject(imageRef);

        // Delete the document from Firestore
        const imageDoc = doc(firestore, 'images', imageToDelete.id);
        await deleteDoc(imageDoc);

        handleImageDelete(imageToDelete.id);
        handleCloseDeleteModal();
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const paginatedImages = images.slice((currentPage - 1) * 6, currentPage * 6);

  return (
    <div className="image-gallery">
      <h2 className="image-gallery__title">Uploaded Images</h2>

      {/* Image grid */}
      <div className="image-gallery__grid">
        {paginatedImages.length > 0 ? (
          paginatedImages.map((image, index) => (
          <div className="image-gallery__item" key={image.id}>
            <img src={image.url} alt={`Uploaded ${index}`} className="image-gallery__image" />
            <div className="image-gallery__icons">
              <button className="image-gallery__icon" onClick={() => handleViewImage(image.url)}>
                <img src="/assets/vectors/eye.svg" alt="View in Full Size" />
              </button>
              <button className="image-gallery__icon" onClick={() => handleOpenDeleteModal(image)}>
                <img src="/assets/vectors/delete.svg" alt="Delete" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="image-gallery__empty">
          <p>No images to display</p>
        </div>
      )}
      </div>

      {/* Modal for viewing the full image */}
      {isModalOpen && selectedImage && (
        <div className="image-modal">
          <div className="image-modal__content">
            {isImageLoaded && (
              <span className="image-modal__close" onClick={handleCloseModal}>
                <img src="/assets/vectors/cancel.svg" alt="Close" />
              </span>
            )}
            <img
              src={selectedImage}
              alt="Full view"
              className="image-modal__image"
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>
        </div>
      )}

      {/* Modal for delete confirmation */}
      {isDeleteModalOpen && (
        <div className="delete-modal">
          <div className="delete-modal__content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this image?</p>
            <div className="delete-modal__actions">
              <button onClick={handleConfirmDelete} className="delete-modal__confirm">
                Delete
              </button>
              <button onClick={handleCloseDeleteModal} className="delete-modal__cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination controls */}
      <div className="image-gallery__pagination">
        <button
          className="image-gallery__pagination-button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="image-gallery__pagination-details">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="image-gallery__pagination-button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ImageGallery;