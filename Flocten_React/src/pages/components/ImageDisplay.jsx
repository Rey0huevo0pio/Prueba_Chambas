import React from 'react';
import useImageModal from '../hooks/useImageModal';

const ImageDisplay = ({ src, alt, label, ringColor = 'primary' }) => {
  const { openModal } = useImageModal();
  
  return (
    <div className="flex flex-col items-center">
      <div className="avatar">
        <div 
          className={`w-24 md:w-32 rounded-full ring ring-${ringColor} ring-offset-base-100 ring-offset-2 cursor-pointer hover:scale-105 transition-transform`}
          onClick={() => openModal(src)}
        >
          <img src={src} alt={alt} />
        </div>
      </div>
      <h2 className="mt-3 font-medium text-center">{label}</h2>
    </div>
  );
};

export default ImageDisplay;