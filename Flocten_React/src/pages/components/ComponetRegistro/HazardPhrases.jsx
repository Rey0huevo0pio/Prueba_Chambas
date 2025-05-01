import { HAZARD_PHRASES } from '../../constants/hazardPhrases';

const HazardPhrases = ({ selectedPhrases, onPhraseToggle }) => (
  <div>
    <label className="block text-lg font-bold text-base-content mb-2">Frases de Peligro</label>
    <div className="space-y-2  ">
      {HAZARD_PHRASES.map((phrase) => (
        <div key={phrase.code} className="flex items-start  ">
          <div className="flex items-center h-5  ">
            <input
              type="checkbox"
              id={`phrase-${phrase.code}`}
              checked={selectedPhrases.includes(phrase.code)}
              onChange={() => onPhraseToggle(phrase.code)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded "
            />
          </div>
          <div className="ml-3 text-sm ">
            <label htmlFor={`phrase-${phrase.code}`} className="font-medium font-bold text-base-content">
              {phrase.code}
            </label>
            <p className="font-bold text-base-content ">{phrase.text}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default HazardPhrases;