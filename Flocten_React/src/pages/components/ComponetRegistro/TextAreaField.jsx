//TextAreaField.jsx
const TextAreaField = ({ label, name, value, onChange, rows = 3 }) => (
    <div>
      <label className="block text-lg font-bold text-base-content">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );
  
  export default TextAreaField;