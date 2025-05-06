import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const signup = async (req, res) => {
  const { fullName, controlNumber, password } = req.body;
  try {
    // Validar campos requeridos
    if (!fullName || !controlNumber || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validar longitud de la contraseña
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Validar formato del número de control
    const controlNumberStr = controlNumber.toString();
    
    // Validar longitud (10-12 caracteres)
    if (controlNumberStr.length < 10 || controlNumberStr.length > 12) {
      return res.status(400).json({ 
        message: "Control number must be between 10 and 12 digits" 
      });
    }
    
    // Validar que los primeros 9 dígitos sean "511622030"
    const requiredPrefix = "511622030";
    if (!controlNumberStr.startsWith(requiredPrefix)) {
      return res.status(400).json({ 
        message: `Control number must start with ${requiredPrefix}` 
      });
    }

    // Verificar si el número de control ya existe
    const existingUser = await User.findOne({ controlNumber });
    if (existingUser) {
      return res.status(400).json({ message: "Control number already exists" });
    }

    // Crear el nuevo usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ 
      fullName, 
      controlNumber, 
      password: hashedPassword 
    });
    await newUser.save();

    // Generar token y devolverlo
    generateToken(newUser._id, res);
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      controlNumber: newUser.controlNumber,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.error("Error in signup controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { controlNumber, password } = req.body;
  try {
    const user = await User.findOne({ controlNumber });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generar token y devolverlo
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      controlNumber: user.controlNumber,
      profilePic: user.profilePic,
      subscription: user.subscription,
      audioUrl: user.audioUrl,
    });
  } catch (error) {
    console.error("Error in login controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  // Borrar la cookie del token JWT
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};

export const updateProfilePic = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No se proporcionó ninguna imagen" });
    }

    // Eliminar la imagen anterior si existe
    if (user.profilePic) {
      const oldImagePath = path.join(__dirname, "..", user.profilePic);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Guardar la nueva imagen
    const imagePath = `/uploads/profile-pics/${req.file.filename}`;
    user.profilePic = imagePath;
    await user.save();

    res.status(200).json({
      message: "Imagen de perfil actualizada correctamente",
      profilePic: imagePath,
    });
  } catch (error) {
    console.error("Error al actualizar la imagen de perfil:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const checkAuth = (req, res) => {
  res.status(200).json(req.user);
};