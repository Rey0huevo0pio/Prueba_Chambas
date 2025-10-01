// src/pages/components/Componen_Re_Laboratorio/ui/ImageUploadSection.jsx

// Asumo que tienes o crearás un componente ImageDisplay similar al de tu código anterior
// Si no lo tienes, puedes crear uno básico para que funcione.
import ImageDisplay from '../ImageDisplay';

const ImageUploadSection = ({ itemType, reactivoImg, simboloImg, onReactivoImgChange, onSimboloImgChange }) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-6 bg-base-200 p-6 rounded-box">
      <ImageDisplay
        src={reactivoImg}
        alt={itemType === 'reactivo' ? "Reactivo" : "Herramienta"}
        label={itemType === 'reactivo' ? "Imagen del Reactivo" : "Imagen de la Herramienta"}
        allowUpload
        onImageChange={onReactivoImgChange}
      />
      <ImageDisplay
        src={simboloImg}
        alt="Adicional"
        label={itemType === 'reactivo' ? "Símbolo de Peligro" : "Imagen Adicional"}
        ringColor="secondary"
        allowUpload
        onImageChange={onSimboloImgChange}
      />
    </div>
  );
};

export default ImageUploadSection;