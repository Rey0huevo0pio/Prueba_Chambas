import React from 'react';

const CustomFormInput = ({ 
  label, 
  name, 
  placeholder, 
  value, 
  onChange, 
  error, 
  required = false, 
  textarea = false, 
  customClass = '' 
}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">
          {label} {required && <span className="text-error">*</span>}
        </span>
      </label>
      {textarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          className={`textarea textarea-bordered h-24 ${customClass} ${error ? 'textarea-error' : ''}`}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          className={`input input-bordered ${error ? 'input-error' : ''}`}
          value={value}
          onChange={onChange}
        />
      )}
      {error && <span className="text-error text-sm">{error}</span>}
    </div>
  );
};

export default CustomFormInput;