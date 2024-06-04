import React from 'react';

const Select = ({ label, id, register, required, options, errors }) => {
  return (
    <div className="form-row">
      <label htmlFor={id}>{label}{required && '*'}</label>
      <select id={id} {...register(id, { required })}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
      {errors[id] && <p className="error-message">{errors[id]?.message}</p>}
    </div>
  );
};

export default Select;
