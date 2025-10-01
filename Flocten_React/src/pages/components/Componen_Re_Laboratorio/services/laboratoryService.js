import axios from 'axios';

const API_BASE_URL = 'http://192.168.100.16:5001/api';

/**
 * Registra un nuevo item (reactivo o herramienta) en el laboratorio.
 * @param {object} params
 * @param {'reactivo' | 'herramienta'} params.itemType - El tipo de item a registrar.
 * @param {object} params.data - Los datos del formulario a enviar.
 * @param {string} params.token - El token de autenticación del usuario.
 * @param {function} params.onUploadProgress - Callback para el progreso de subida.
 * @returns {Promise<object>} La respuesta del servidor.
 */
export const registerLabItem = async ({ itemType, data, token, onUploadProgress }) => {
  const endpoint = itemType === 'reactivo' ? '/reactivos' : '/herramientas';

  try {
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      onUploadProgress,
    });
    return response.data;
  } catch (error) {
    // Re-lanza el error para que el componente que lo llama pueda manejarlo
    if (error.response) {
      // El backend respondió con un código de error
      throw new Error(error.response.data.message || `Error al registrar ${itemType}.`);
    } else if (error.request) {
      // La petición se hizo pero no hubo respuesta
      throw new Error('No se pudo conectar con el servidor. Verifica tu conexión.');
    } else {
      // Algo más causó el error
      throw new Error(`Error inesperado: ${error.message}`);
    }
  }
};