import { HAZARD_PICTOGRAMS } from '../../constants/hazardPictograms';

const HazardPictograms = ({ selectedPictograms, onPictogramToggle }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Pictogramas de Peligro</label>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {HAZARD_PICTOGRAMS.map((pictogram) => (
        <div key={pictogram.id} className="flex items-center">
          <input
            type="checkbox"
            id={`pictogram-${pictogram.id}`}
            checked={selectedPictograms.includes(pictogram.id)}
            onChange={() => onPictogramToggle(pictogram.id)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor={`pictogram-${pictogram.id}`} className="ml-2 flex items-center">
            <span className="mr-1">{pictogram.icon}</span>
            {pictogram.label}
          </label>
        </div>
      ))}
    </div>
  </div>
);

export default HazardPictograms;