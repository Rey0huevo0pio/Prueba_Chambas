// middlewares/checkPermissions.js
export const checkPermissions = (requiredPermissions) => {
    return (req, res, next) => {
      const user = req.user; // Asumiendo que tienes el usuario en req.user después de autenticar
      
      if (!user) {
        return res.status(401).json({ message: "No autenticado" });
      }
  
      const userPermissions = user.PermisosEx || {};
      
      // Verificar si el usuario tiene todos los permisos requeridos
      const hasAllPermissions = Object.entries(requiredPermissions).every(
        ([permission, required]) => !required || userPermissions[permission]
      );
  
      if (!hasAllPermissions) {
        return res.status(403).json({ 
          message: "No tienes los permisos necesarios para esta acción",
          requiredPermissions,
          userPermissions
        });
      }
  
      next();
    };
  };