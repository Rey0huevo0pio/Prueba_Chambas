import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App.jsx'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { BrowserRouter } from 'react-router-dom'
import { motion } from 'framer-motion' // <-- 1. Importa motion

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* 2. Reemplaza el <div> por <motion.div> y añade las propiedades de animación */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75, ease: "easeInOut" }}
        className='bg-base-content pt-18' // Mantenemos tus clases originales
      >
        <App />
      </motion.div>
    </BrowserRouter>
  </StrictMode>,
)