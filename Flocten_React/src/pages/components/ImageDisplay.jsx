import React from 'react';
import useImageModal from '../hooks/useImageModal';
import axios from 'axios'; // <--- IMPORTACIÓN CORRECTA

const ImageDisplay = ({ src, alt, label, ringColor = 'primary', allowUpload = false, onImageChange }) => {
  const { openModal } = useImageModal();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.post("http://localhost:5001/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        onImageChange(res.data.imageUrl);
      } catch (err) {
        console.error("Error al subir imagen:", err);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="avatar relative group">
        <div 
          className={`w-24 md:w-32 rounded-full ring ring-${ringColor} ring-offset-base-100 ring-offset-2 cursor-pointer hover:scale-105 transition-transform`}
          onClick={() => openModal(src)}
        >
          <img src={src} alt={alt} />
        </div>

        {allowUpload && (
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        )}
      </div>
      <h2 className="mt-3 font-medium text-center">{label}</h2>
    </div>
  );
};

export default ImageDisplay;
