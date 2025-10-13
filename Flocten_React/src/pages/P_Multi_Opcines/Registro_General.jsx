import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore'; // <<< AÑADIDO: Importamos el store

import { FaFlask} from 'react-icons/fa';

function Registro_General() {
  const { updateMenuLink } = useAuthStore();

  const registrationLinks = [
    {
      to: '/Re_Laboratorio',
      label: 'Registro para Laboratorio',
      icon: <FaFlask className="text-3xl mb-3 text-cyan-400" />,
      description: 'Accede al módulo de registro para el área de laboratorio.'
    }
  ];

  const handleOptionClick = (path) => {
    updateMenuLink(1, path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 p-4 sm:pt-16 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-base-content mb-2">Módulo de Registros</h1>
        <p className="text-lg text-base-content/70">Selecciona el área a la que deseas acceder.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-6xl w-full">
    
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