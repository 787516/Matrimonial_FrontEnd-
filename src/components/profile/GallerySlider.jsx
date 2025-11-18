import { useState } from 'react';
import React from 'react'

const GallerySlider = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="gallery-slider">
      <img src={photos[currentIndex]} alt={`Photo ${currentIndex + 1}`} />
      <button onClick={prevPhoto}>←</button>
      <button onClick={nextPhoto}>→</button>
    </div>
  );
};

export default GallerySlider;
