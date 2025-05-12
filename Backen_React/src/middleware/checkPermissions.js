// permissionsMiddleware.js
import User from '../models/user.model.js';

export const checkPermissions = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      // Obtener el usuario de la base de datos usando el ID del token
      const user = await User.findById(req.user._id);
      
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Verificar si el usuario tiene el permiso requerido
      if (!user.PermisosEx[requiredPermission]) {
        return res.status(403).json({ 
          message: `Acceso denegado. Se requiere permiso de ${requiredPermission}` 
        });
      }

      // Si tiene permiso, continuar
      next();
    } catch (error) {
      console.error('Error al verificar permisos:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
};