// user.route.js
import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

// Actualizar foto de perfil
// En user.route.js
router.put("/upload/ProfilePic/:id", async (req, res) => {
    const { id } = req.params;
    const { imageUrl } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { 
          profilePic: imageUrl,
          updatedAt: new Date()
        },
        { new: true }
      );
      
      if (!updatedUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      
      // Forzar actualización de caché con timestamp
      const cacheBuster = `t=${new Date().getTime()}`;
      const profilePicWithCacheBust = updatedUser.profilePic.includes('?') 
        ? `${updatedUser.profilePic.split('?')[0]}?${cacheBuster}`
        : `${updatedUser.profilePic}?${cacheBuster}`;
  
      res.json({ 
        message: "Imagen actualizada correctamente", 
        user: {
          ...updatedUser._doc,
          profilePic: profilePicWithCacheBust
        }
      });
    } catch (error) {
      console.error("Error al actualizar profilePic:", error);
      res.status(500).json({ message: "Error al actualizar la imagen" });
    }
  });

export default router;
