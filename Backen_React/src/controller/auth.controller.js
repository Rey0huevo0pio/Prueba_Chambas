import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";

import bcrypt from "bcryptjs";


export const signup = async (req, res) => {
  const { fullName, controlNumber, password } = req.body;
  try {
    if (!fullName || !controlNumber || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    const existingUser = await User.findOne({ controlNumber });
    if (existingUser) return res.status(400).json({ message: "Control number already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, controlNumber, password: hashedPassword });
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



export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    // Subir la imagen a Cloudinary en una carpeta específica
    const uploadResponse = await cloudinary.uploader.upload(profilePic, {
      folder: "IcnPerfil", // Cambia esto por el nombre de la carpeta deseada
      public_id: `perfil_${userId}_${Date.now()}`, // Nombre único basado en el ID del usuario y la fecha
      overwrite: true, // Permite actualizar la imagen sin crear duplicados
    });

    // Actualizar la imagen de perfil en la base de datos
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error en updateProfile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const checkAuth = (req, res) => {
  res.status(200).json(req.user);
};
