import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/profile-pics"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
  
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), (req, res) => {
  const fileUrl = `http://192.168.100.19:5001/uploads/profile-pics/${req.file.filename}`; 
  res.json({ imageUrl: fileUrl });
});


export default router;
