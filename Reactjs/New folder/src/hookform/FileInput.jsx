import React from 'react';

const FileInput = ({ label, id, register, errors }) => {
  return (
    <div className="form-row">
      <label htmlFor={id}>{label}</label>
      <input id={id} type="file" {...register(id)} />
      {errors[id] && <p className="error-message">{errors[id]?.message}</p>}
    </div>
  );
};

export default FileInput;
