import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';

const Inf_Readaptivos = () => {
  const [reactivos, setReactivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authUser } = useAuthStore();

  // Datos de ejemplo para FAQs (puedes cargarlos desde tu API si es necesario)
  const faqs = [
    {
      pregunta: "¿Cómo almacenar reactivos químicos correctamente?",
      respuesta: "Deben guardarse en un lugar fresco, seco y bien ventilado, lejos de luz solar directa.",
      tags: ["almacenamiento", "seguridad"]
    },
    {
      pregunta: "¿Qué hacer en caso de derrame?",
      respuesta: "Usar equipo de protección y seguir el protocolo de seguridad del laboratorio.",
      tags: ["emergencia"]
    }
  ];

  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  useEffect(() => {
    const fetchReactivos = async () => {
      try {
        const response = await axios.get(
          'http://192.168.100.19:5001/api/list/reactivos',
          { headers: { 'Authorization': `Bearer ${authUser?.token}` } }
        );
        setReactivos(response.data.data || response.data);
        setLoading(false);
      } catch (err) {
        setError(`Error al cargar los reactivos: ${err.response?.data?.message || err.message}`);
        console.error("Error details:", err);
        setLoading(false);
      }
    };
  
    fetchReactivos();
  }, [authUser?.token]);

  const toggleFaq = (index) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">Cargando reactivos...</p></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center"><p className="text-red-500">{error}</p></div>;
  if (!reactivos.length) return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">No hay reactivos disponibles</p></div>;

  return (
<div className="bg-gray-50 min-h-screen pt-24">
  {/* Sección de Reactivos */}
  <section className="py-12 px-6 md:px-24">
    <h2 className="text-2xl font-bold mb-8 text-center">Inventario de Reactivos</h2>
    <div className="grid gap-4 sm:grid-cols-1">
  {reactivos.map((reactivo) => (
    <div key={reactivo._id} className="group">
      <input type="checkbox" id={`accordion-${reactivo._id}`} className="hidden peer" />
      <label 
        htmlFor={`accordion-${reactivo._id}`} 
        className="flex justify-between items-center bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
      >
        <div className="flex items-center space-x-4">
        
          <div>
            <h3 className="text-lg font-semibold">{reactivo.codigo}</h3>
            <p className="text-sm text-gray-600">{reactivo.nombre}</p>
          </div>
        </div>
        <svg 
          className="w-5 h-5 text-gray-500 transition-transform duration-300 group-[.peer:checked+&]:rotate-180" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </label>
      
      <div className="max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-96">
        <div className="p-4 space-y-2">
        {reactivo.imagenReactivo && (
            <img
              src={reactivo.imagenReactivo}
              alt={reactivo.codigo}
              className="w-16 h-16 object-contain rounded-lg"
            />
          )}
          <p className="text-sm"><span className="font-medium">Fórmula:</span> {reactivo.formula}</p>
          <p className="text-sm"><span className="font-medium">Cantidad:</span> {reactivo.cantidad}</p>
          <p className="text-sm"><span className="font-medium">Lote:</span> {reactivo.numeroLote}</p>
          <p className="text-sm"><span className="font-medium">Concentración:</span> {reactivo.concentracion}</p>
          {reactivo.descripcion && (
            <p className="text-sm text-gray-700 mt-3 pt-3 border-t border-gray-100">
              {reactivo.descripcion}
            </p>
          )}
        </div>
      </div>
    </div>
  ))}
</div>
  </section>

  {/* Sección de FAQs - Ahora completamente en acordeón */}
  <section className="py-12 px-6 md:px-24 bg-white">
    <h2 className="text-2xl font-bold mb-8 text-center">Preguntas Frecuentes</h2>
    
    <div className="max-w-4xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-gray-50 rounded-xl shadow-md overflow-hidden border border-gray-200">
          <button 
            className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-100 transition-colors"
            onClick={() => toggleFaq(index)}
          >
            <h3 className="text-lg font-semibold text-left flex-1">{faq.pregunta}</h3>
            <svg
              className={`w-5 h-5 ml-4 flex-shrink-0 transform transition-transform duration-200 ${activeFaqIndex === index ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {activeFaqIndex === index && (
            <div className="px-6 pb-6 pt-0 text-gray-600">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mr-4 mt-1">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="mb-3">{faq.respuesta}</p>
                  {faq.tags && (
                    <div className="flex flex-wrap gap-2">
                      {faq.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-200 text-xs rounded-full text-gray-600">
                          {tag}
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
  </section>
</div>
  );
};

export default Inf_Readaptivos;