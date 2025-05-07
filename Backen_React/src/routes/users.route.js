// users.route.js
import express from 'express';
import User from '../models/user.model.js';
import { checkPermissions } from '../middleware/checkPermissions.js';

const router = express.Router();

// Actualizar permisos de usuario
router.put('/:controlNumber/permissions', async (req, res) => {
    try {
      const { controlNumber } = req.params;
      const { permissions } = req.body;
  
      const user = await User.findOne({ controlNumber });
  
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      user.PermisosEx = permissions;
  
      await user.save();
  
      res.json({
        success: true,
        message: 'Permisos actualizados correctamente',
        permissions: user.PermisosEx
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al actualizar permisos',
        error: error.message
      });
    }
  });
  

export default router;