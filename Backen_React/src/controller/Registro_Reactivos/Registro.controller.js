import { reactivoService } from './reactivo.service.js';
import { reactivoValidator } from './reactivo.validator.js';
import { reactivoUtils } from './reactivo.utils.js';

// Registrar nuevo reactivo
export const Registro_Reactivo = async (req, res) => {
  try {
    reactivoValidator.validarCamposRequeridos(req.body);
    
    const nuevoReactivo = await reactivoService.crearReactivo(req.body);
    
    reactivoUtils.respuestaExitosa(
      res, 
      "Reactivo registrado correctamente", 
      nuevoReactivo, 
      201
    );
  } catch (error) {
    reactivoUtils.manejarError(error, res);
  }
};

// Buscar reactivos
export const buscarReactivos = async (req, res) => {
  try {
    const { term } = req.query;
    
    reactivoValidator.validarTerminoBusqueda(term);
    
    const reactivos = await reactivoService.buscarReactivos(term);
    
    reactivoUtils.respuestaExitosa(
      res, 
      "Búsqueda completada", 
      reactivos
    );
  } catch (error) {
    reactivoUtils.manejarError(error, res);
  }
};

// Obtener reactivo por código
export const obtenerReactivoPorCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    
    const reactivo = await reactivoService.obtenerPorCodigo(codigo);
    
    reactivoUtils.respuestaExitosa(
      res, 
      "Reactivo encontrado", 
      reactivo
    );
  } catch (error) {
    reactivoUtils.manejarError(error, res);
  }
};

// Actualizar reactivo
export const actualizarReactivo = async (req, res) => {
  try {
    const { codigo } = req.params;
    
    const reactivoActualizado = await reactivoService.actualizarReactivo(
      codigo, 
      req.body
    );
    
    reactivoUtils.respuestaExitosa(
      res, 
      "Reactivo actualizado correctamente", 
      reactivoActualizado
    );
  } catch (error) {
    reactivoUtils.manejarError(error, res);
  }
};

// Eliminar reactivo
export const eliminarReactivo = async (req, res) => {
  try {
    const { codigo } = req.params;
    
    const reactivoEliminado = await reactivoService.eliminarReactivo(codigo);
    
    reactivoUtils.respuestaExitosa(
      res, 
      "Reactivo eliminado correctamente", 
      reactivoEliminado
    );
  } catch (error) {
    reactivoUtils.manejarError(error, res);
  }
};

// Listar todos los reactivos
export const listarReactivos = async (req, res) => {
  try {
    const reactivos = await reactivoService.listarReactivos();
    
    reactivoUtils.respuestaExitosa(
      res, 
      "Reactivos obtenidos correctamente", 
      reactivos
    );
  } catch (error) {
    reactivoUtils.manejarError(error, res);
  }
};