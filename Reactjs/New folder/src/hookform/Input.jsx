import React from 'react';

const Input = ({ label, id, type = "text", register, required, errors, readOnly = false }) => {
  return (
    <div className="form-row">
      <label htmlFor={id}>{label}{required && '*'}</label>
      <input id={id} type={type} {...register(id, { required })} readOnly={readOnly} />
      {errors[id] && <p className="error-message">{errors[id]?.message}</p>}
    </div>
  );
};

export default Input;