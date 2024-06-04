import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { workspacesadd, workspacesput } from "../services/superAdminService";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  address: yup.string().required("Address is required"),
  active: yup.boolean().required("Status is required"),
});

const WorkspaceForm = ({ workspaceId, onSuccess ,fetchWorkspaces }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (workspaceId) {
      Object.keys(workspaceId).forEach((key) =>
        setValue(key, workspaceId[key])
      );
      setValue("active", workspaceId["active"])
    }
  }, [setValue, workspaceId]);

  const onSubmit = (data) => {
    data.logo ="https://www.softwareco.com/wp-content/uploads/2020/09/logo.png";
    if (workspaceId) {
        workspacesput(workspaceId?._id,data).then((res)=>{
            console.log(res)
        })
    } else {
        workspacesadd(data).then((res)=>{
            console.log(res)
        })
    }
    onSuccess();
    fetchWorkspaces();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="workspace-form">
      <div className="form-group">
        <label>Name</label>
        <input {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div className="form-group">
        <label>Email</label>
        <input {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div className="form-group">
        <label>Phone Number</label>
        <input {...register("phoneNumber")} />
        {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div className="form-group">
        <label>Address</label>
        <input {...register("address")} />
        {errors.address && <p>{errors.address.message}</p>}
      </div>
      <div className="form-group">
        <label>Active</label>
        <input type="checkbox" {...register("active")} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default WorkspaceForm;
