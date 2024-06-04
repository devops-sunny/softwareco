import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { employeesadd, employeesput, getemployeespace, getviewWorkspaceData } from '../services/WorkspaceService';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string(),
  address: yup.string(),
  companyName: yup.string(),
  companyAddress: yup.string(),
  experience: yup.string(),
  department: yup.string(),
  joiningDate: yup.string(),
  workspace: yup.string().required('Workspace is required'),
  active: yup.boolean()
});

const EmployeeForm = ({ employeeId, onSuccess }) => {
  const [workspaces, setWorkspaces] = useState([]);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    getviewWorkspaceData().then((res)=>{
        setWorkspaces(res)
    })
    if(employeeId){
        Object.keys(employeeId).forEach(key => setValue(key, employeeId[key]));
    }

    if(employeeId){
        getviewWorkspaceData().then((res)=>{
            setValue("workspace",employeeId["workspace"])
            setValue("active", employeeId["active"])
        })
    }
  }, [employeeId ,setValue]);

  const onSubmit = data => {
    if (employeeId) {
      employeesput(employeeId._id ,data)
    } else {
      employeesadd(data)
    }
    getemployeespace();
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="workspace-form">
      <div className="form-group">
        <label>Name</label>
        <input {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div className="form-group">
        <label>Email</label>
        <input {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input {...register('phone')} />
        {errors.phone && <p>{errors.phone.message}</p>}
      </div>
      <div className="form-group">
        <label>Address</label>
        <input {...register('address')} />
        {errors.address && <p>{errors.address.message}</p>}
      </div>
      <div className="form-group">
        <label>Company Name</label>
        <input {...register('companyName')} />
      </div>
      <div className="form-group">
        <label>Company Address</label>
        <input {...register('companyAddress')} />
      </div>
      <div className="form-group">
        <label>Experience</label>
        <input {...register('experience')} />
      </div>
      <div className="form-group">
        <label>Department</label>
        <input {...register('department')} />
      </div>
      <div className="form-group">
        <label>Joining Date</label>
        <input type="date" {...register('joiningDate')} />
      </div>
      <div className="form-group">
        <label>Workspace</label>
        <select {...register('workspace')}>
          <option value="">Select a workspace</option>
          {workspaces.map(workspace => (
            <option key={workspace._id} value={workspace._id}>{workspace.name}</option>
          ))}
        </select>
        {errors.workspace && <p>{errors.workspace.message}</p>}
      </div>
      <div className="form-group">
        <label>Active</label>
        <input type="checkbox" {...register('active')} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EmployeeForm;
