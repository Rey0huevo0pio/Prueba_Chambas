import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore'; // <<< AÑADIDO: Importamos el store

// Iconos opcionales para un mejor impacto visual (ej. con react-icons)
import { FaFlask, FaLaptopCode, FaCogs } from 'react-icons/fa';

function Registro_General() {
  const { updateMenuLink } = useAuthStore();

  const registrationLinks = [
    {
      to: '/Re_Laboratorio',
      label: 'Registro para Laboratorio',
      icon: <FaFlask className="text-3xl mb-3 text-cyan-400" />,
      description: 'Accede al módulo de registro para el área de laboratorio.'
    },
    {
      to: '/Re_Software',
      label: 'Registro para Ingeniería de Software',
      icon: <FaLaptopCode className="text-3xl mb-3 text-emerald-400" />,
      description: 'Registra y gestiona proyectos y actividades de software.'
    },
    {
      to: '/Re_Mecatronica',
      label: 'Registro para Mecatrónica',
      icon: <FaCogs className="text-3xl mb-3 text-amber-400" />,
      description: 'Administra los registros del departamento de mecatrónica.'
    }
  ];

  const handleOptionClick = (path) => {
    updateMenuLink(1, path);
  };

  return (
    // Contenedor principal
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 p-4 sm:pt-24 flex flex-col items-center pt-20">
      {/* min-h-screen: Ocupa al menos toda la altura de la pantalla.
        bg-gradient-to-br from-base-200 to-base-300: Fondo con un gradiente sutil usando colores del tema.
        p-4 sm:p-8: Padding responsivo (más espacio en pantallas grandes).
        flex flex-col items-center: Centra el contenido horizontalmente.
        pt-20: Padding superior para bajar el contenido y que no choque con el navbar.
      */}
      
      <div className="text-center mb-12">
        {/*
          text-center: Centra el texto.
          mb-12: Margen inferior para separar el título de las tarjetas.
        */}
        <h1 className="text-4xl font-bold text-base-content mb-2">Módulo de Registros</h1>
        <p className="text-lg text-base-content/70">Selecciona el área a la que deseas acceder.</p>
        {/*
          text-4xl font-bold: Texto grande y en negrita para el título principal.
          text-lg text-base-content/70: Texto secundario más pequeño y con 70% de opacidad.
        */}
      </div>

      {/* Contenedor de la cuadrícula (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
      {/*
        grid: Activa el layout de CSS Grid.
        grid-cols-1: Por defecto (móviles) es una sola columna.
        md:grid-cols-2: En pantallas medianas (tablets), son dos columnas.
        lg:grid-cols-3: En pantallas grandes (desktop), son tres columnas. ¡Esto lo hace responsivo!
        gap-8: Espacio de separación entre las tarjetas.
        max-w-6xl w-full: Limita el ancho máximo y asegura que ocupe todo el espacio disponible hasta ese límite.
      */}
        {registrationLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => handleOptionClick(link.to)}
            className="
              bg-base-100           
              rounded-xl            
              shadow-lg             
              p-6                  
              flex flex-col items-center 
              text-center           
              transform             
              transition-transform duration-300 
              hover:scale-105       
              hover:shadow-2xl      
              focus:outline-none focus:ring-2 focus:ring-primary
            "
          >
          {/*
            bg-base-100: Color de fondo de la tarjeta (del tema).
            rounded-xl: Bordes muy redondeados.
            shadow-lg: Sombra grande y suave.
            p-6: Padding interno.
            flex flex-col items-center: Centra el contenido de la tarjeta (ícono y texto).
            transform transition-transform duration-300: Prepara la tarjeta para una animación suave.
            hover:scale-105: Al pasar el cursor, la tarjeta se agranda un 5%.
            hover:shadow-2xl: La sombra se hace más pronunciada en el hover.
            focus:*: Clases para accesibilidad, muestran un anillo de color al seleccionar con el teclado.
          */}
            {link.icon}
            <h2 className="text-xl font-semibold text-base-content mb-2">{link.label}</h2>
            <p className="text-base-content/60">{link.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Registro_General;