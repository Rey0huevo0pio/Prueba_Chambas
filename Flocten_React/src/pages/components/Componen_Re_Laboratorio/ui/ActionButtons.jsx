// src/pages/components/Componen_Re_Laboratorio/ui/ActionButtons.jsx

import { FaTimes } from "react-icons/fa";

const ActionButtons = ({ isSubmitting, uploadProgress, onCancel, itemType }) => {
  return (
    <div className="flex flex-col md:flex-row justify-end gap-4 pt-6">
      <button
        type="button"
        className="btn btn-outline btn-error btn-lg"
        onClick={onCancel}
      >
        <FaTimes className="mr-2" /> Cancelar
      </button>
      <button
        type="submit"
        className="btn btn-primary btn-lg"
        disabled={isSubmitting || !itemType}
      >
        {isSubmitting ? (
          <>
            <span className="loading loading-spinner"></span>
            {uploadProgress > 0 && `Subiendo... ${uploadProgress}%`}
          </>
        ) : (
          `Guardar ${itemType ? itemType.charAt(0).toUpperCase() + itemType.slice(1) : ''}`
        )}
      </button>
    </div>
  );
};

export default ActionButtons;