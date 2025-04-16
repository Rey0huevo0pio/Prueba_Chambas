import React from "react";
import { 
  FaFlask, 
  FaExclamationTriangle, 
  FaRegCalendarAlt,
  FaInfoCircle,
  FaShieldAlt,
  FaFirstAid,
  FaBiohazard
} from "react-icons/fa";

const InfoCard = ({ title, value, icon, className = "" }) => {
  if (!value) return null;
  
  return (
    
    <div className={`bg-base-100 rounded-lg shadow-sm p-4 ${className}`}>
      
      <div className="flex items-center gap-3 mb-2">
        <div className="text-primary text-xl">{icon}</div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <p className="text-base-content/90">{value}</p>
    </div>
  );
};

const HazardPictogram = ({ icon, label, className = "" }) => (
  <div className={`tooltip ${className} `} data-tip={label}>
    <div className="w-14 h-14 rounded-lg bg-base-200 flex items-center justify-center text-3xl">
      {icon}
    </div>
  </div>
);

const ChemicalReagentDetail = ({ reagent }) => {
  const hazardPictograms = {
    explosive: { icon: "💥", label: "Explosivo" },
    flammable: { icon: "🔥", label: "Inflamable" },
    oxidizing: { icon: "⚡", label: "Oxidante" },
    corrosive: { icon: "⚠️", label: "Corrosivo" },
    toxic: { icon: "☠️", label: "Tóxico" },
    healthHazard: { icon: "💀", label: "Peligro para la salud" },
    environmental: { icon: "🌍", label: "Peligro ambiental" },
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FaFlask className="text-primary" />
            {reagent.name}
          </h1>
          <p className="text-2xl font-mono text-primary/80">{reagent.formula}</p>
        </div>
        
        <div className="badge badge-lg badge-primary gap-2">
          <FaRegCalendarAlt />
          Lote: {reagent.lotNumber}
        </div>
      </div>

      {/* Información básica */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InfoCard 
          title="Cantidad" 
          value={reagent.quantity} 
          icon={<FaFlask />}
        />
        <InfoCard 
          title="Concentración" 
          value={reagent.concentration} 
          icon={<FaInfoCircle />}
        />
        <InfoCard 
          title="Fecha de Caducidad" 
          value={reagent.expirationDate} 
          icon={<FaRegCalendarAlt />}
        />
      </div>

      {/* Descripción */}
      {reagent.description && (
        <div className="bg-base-100 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaInfoCircle className="text-primary" />
            Descripción
          </h2>
          <p className="text-base-content/90 whitespace-pre-line">{reagent.description}</p>
        </div>
      )}

      {/* Sección de peligros */}
      {(reagent.hazardPictograms?.length > 0 || reagent.hazardPhrases?.length > 0) && (
        <div className="bg-warning/10 rounded-lg shadow-sm p-6 border border-warning/20">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaBiohazard className="text-warning" />
            Información de Peligros
          </h2>
          
          {/* Pictogramas */}
          {reagent.hazardPictograms?.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-3">Pictogramas de Peligro:</h3>
              <div className="flex flex-wrap gap-4">
                {reagent.hazardPictograms.map(pictogram => (
                  <HazardPictogram
                    key={pictogram}
                    icon={hazardPictograms[pictogram]?.icon || "⚠️"}
                    label={hazardPictograms[pictogram]?.label || "Peligro"}
                    className="hover:scale-105 transition-transform"
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Frases H/P */}
          {reagent.hazardPhrases?.length > 0 && (
            <div>
              <h3 className="font-medium mb-3">Frases de Peligro/Prevención:</h3>
              <ul className="space-y-2">
                {reagent.hazardPhrases.map(phrase => (
                  <li key={phrase} className="bg-warning/5 p-3 rounded-lg">
                    <span className="font-mono font-bold">{phrase}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Seguridad */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reagent.firstAid && (
          <div className="bg-error/5 rounded-lg shadow-sm p-6 border border-error/10">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaFirstAid className="text-error" />
              Primeros Auxilios
            </h2>
            <p className="text-base-content/90 whitespace-pre-line">{reagent.firstAid}</p>
          </div>
        )}
        
        {reagent.safeHandling && (
          <div className="bg-success/5 rounded-lg shadow-sm p-6 border border-success/10">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaShieldAlt className="text-success" />
              Manipulación Segura
            </h2>
            <p className="text-base-content/90 whitespace-pre-line">{reagent.safeHandling}</p>
          </div>
        )}
      </div>

      {/* Información adicional */}
      <div className="bg-base-200 rounded-lg p-4 text-sm text-base-content/70">
        <div className="flex items-center gap-2">
          <FaInfoCircle />
          <p>Última actualización: {reagent.lastUpdated || "No especificado"}</p>
        </div>
      </div>
    </div>
  );
};

// Ejemplo de uso
const ReagentDetailPage = () => {
  const exampleReagent = {
    name: "Cloruro de sodio",
    formula: "NaCl",
    quantity: "5 frascos de 500g",
    concentration: "1M",
    lotNumber: "LOTE-2023-001",
    expirationDate: "15/06/2025",
    description: "Sólido cristalino blanco, soluble en agua. Usado comúnmente en laboratorio como solución tampón y en procesos biológicos.",
    hazardPictograms: ["corrosive", "healthHazard"],
    hazardPhrases: ["H318 - Daño ocular grave", "P280 - Usar guantes/ropa protectora"],
    firstAid: "En caso de contacto con los ojos, lavar inmediatamente con abundante agua durante al menos 15 minutos. Consultar a un médico si la irritación persiste.",
    safeHandling: "Usar guantes de nitrilo y protección ocular. Evitar la inhalación de polvo. Almacenar en lugar seco y bien ventilado.",
    lastUpdated: "10/04/2023"
  };

  return (
<div className="min-h-screen bg-base-100/50 py-8 pt-32">
  <div className="container mx-auto px-4">
    <div className="flex justify-center mb-8">
      <input
        type="text"
        placeholder="Buscar reactivo químico..."
        className="input input-bordered w-full max-w-md rounded-full shadow-sm"
      />
    </div>

    <div className="flex justify-center">
      <div className="w-full max-w-4xl">
        <ChemicalReagentDetail reagent={exampleReagent} />
      </div>
    </div>
  </div>
</div>

  );
};

export default ReagentDetailPage;