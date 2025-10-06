import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';

const Inf_Readaptivos = () => {
  const [reactivos, setReactivos] = useState([]);
  const [Usuaris, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authUser } = useAuthStore();
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaqIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [reactivosRes, usuariosRes] = await Promise.all([
          axios.get('http://192.168.100.16:5001/api/list/reactivos', {
            withCredentials: true, // Importante para enviar cookies
            headers: { 
              'Authorization': `Bearer ${authUser?.token}`,
              'Content-Type': 'application/json'
            }
          }),
          axios.get('http://192.168.100.16:5001/api/list/usuarios', {
            withCredentials: true,
            headers: { 
              'Authorization': `Bearer ${authUser?.token}`,
              'Content-Type': 'application/json'
            }
          })
        ]);
        
        setReactivos(reactivosRes.data.data || reactivosRes.data);
        setUsuarios(usuariosRes.data.data || usuariosRes.data);
      } catch (err) {
        setError(`Error al cargar los datos: ${err.response?.data?.message || err.message}`);
        console.error("Error details:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [authUser?.token]);


  

  const faqs = [
    {
      pregunta: "¿Cómo almacenar reactivos químicos correctamente?",
      respuesta: "Los reactivos deben guardarse en un lugar fresco, seco y bien ventilado, lejos de luz solar directa. Organícelos por compatibilidad química y mantenga los recipientes bien cerrados.",
      tags: ["almacenamiento", "seguridad"]
    },
    {
      pregunta: "¿Qué hacer en caso de derrame?",
      respuesta: "1. Alertar a las personas cercanas\n2. Usar equipo de protección adecuado\n3. Contener el derrame con materiales absorbentes\n4. Seguir el protocolo de seguridad del laboratorio\n5. Reportar el incidente",
      tags: ["emergencia", "protocolo"]
    }
  ];

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
     
      <p className="text-gray-600">Cargando información...</p>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-4">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    </div>
  );
  
  if (!reactivos.length && !Usuaris.length) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">No hay información disponible</h3>
        <p className="mt-1 text-gray-500">No se encontraron reactivos ni usuarios registrados.</p>
      </div>
    </div>
  );

  return (
/* className=min-h-screen bg-gradient-to-br from-base-100 to-base-200 p-4 md:p-8 flex justify-center items-start*/
    
    <div className="bg-gradient-to-br from-base-100 to-base-200 min-h-screen pt-4 pb-12 ">


      {/* Header */}
      <header className="bg-gradient-to-r  shadow-sm  from-primary to-base-content">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Gestión de Laboratorio
          </h1>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Inventario de reactivos y usuarios registrados
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 font-bold">
          {/* Sección de Reactivos */}
          <section className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  Inventario de Reactivos
                </h2>
              </div>
              <div className="p-6">
                {reactivos.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                    {reactivos.map((reactivo) => (
                      <div key={`reactivo-${reactivo._id}`} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-4">
                          <div className="flex items-start space-x-4">
                            {reactivo.imagenReactivo ? (
                       <div className="relative group">
                       <img
                         src={reactivo.imagenReactivo}
                         alt={reactivo.codigo}
                         className="w-32 h-32 object-contain rounded-lg border border-gray-200 p-1 bg-white shadow-sm group-hover:shadow-md transition-all duration-300"
                       />
                       <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></div>
                     </div>
                            ) : (
                              <div className="w-16 h-16 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                              </div>
                            )}
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-800">{reactivo.codigo}</h3>
                              <p className="text-sm text-gray-600">{reactivo.nombre}</p>
                              <div className="mt-2 flex flex-wrap gap-1">
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                  {reactivo.cantidad} unidades
                                </span>
                                {reactivo.concentracion && (
                                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                    {reactivo.concentracion}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <p className="text-gray-500">Fórmula</p>
                                <p className="font-medium">{reactivo.formula || 'N/A'}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Lote</p>
                                <p className="font-medium">{reactivo.numeroLote || 'N/A'}</p>
                              </div>
                            </div>
                            
                            {reactivo.descripcion && (
                              <div className="mt-2">
                                <p className="text-gray-500">Descripción</p>
                                <p className="text-sm text-gray-700">{reactivo.descripcion}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No hay reactivos registrados</h3>
                    <p className="mt-1 text-sm text-gray-500">No se encontraron reactivos en el inventario.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Sección de Usuarios */}
          <section className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Lista de Usuarios
                </h2>
              </div>
              <div className="p-6">
                {Usuaris.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                    {Usuaris.map((usuario) => (
                      <div key={`usuario-${usuario._id || usuario.controlNumber}`} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-4">
                          <div className="flex items-center space-x-4">
                            {usuario.profilePic ? (
                            <div className="relative group">
                              <img
                                src={usuario.profilePic}
                                alt={usuario.fullName}
                                className="w-32 h-32 object-cover rounded-lg border border-gray-200 p-1 bg-white shadow-sm group-hover:shadow-md transition-all duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></div>
                                </div>
                            ) : (
                              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center border-2 border-purple-200">
                                <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                            )}
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-800">{usuario.fullName}</h3>
                              <p className="text-sm text-gray-600">{usuario.controlNumber}</p>
                              <div className="mt-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                  Usuario
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <div className="text-sm">
                              <p className="text-gray-500">Información adicional</p>
                              <p className="text-gray-700 mt-1">Número de control: {usuario.controlNumber}</p>
                              {/* Puedes agregar más campos de usuario aquí si están disponibles */}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No hay usuarios registrados</h3>
                    <p className="mt-1 text-sm text-gray-500">No se encontraron usuarios en el sistema.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Sección de FAQs */}
        <section className="mt-12">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-800 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Preguntas Frecuentes
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={`faq-${index}`} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button 
                      className={`w-full flex justify-between items-center p-4 text-left ${activeFaqIndex === index ? 'bg-green-50' : 'hover:bg-gray-50'} transition-colors`}
                      onClick={() => toggleFaq(index)}
                    >
                      <h3 className="font-medium text-gray-900 flex-1">{faq.pregunta}</h3>
                      <svg
                        className={`w-5 h-5 ml-4 flex-shrink-0 transform transition-transform duration-200 ${activeFaqIndex === index ? 'rotate-180 text-green-600' : 'text-gray-400'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {activeFaqIndex === index && (
                      <div className="px-4 pb-4">
                        <div className="flex items-start">
                          <div className="bg-green-100 p-2 rounded-lg mr-3 mt-1">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-700 whitespace-pre-line">{faq.respuesta}</p>
                            {faq.tags && faq.tags.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {faq.tags.map((tag) => (
                                  <span key={`tag-${tag}`} className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Inf_Readaptivos;