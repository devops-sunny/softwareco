import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../hookform/Input";
import Select from "../hookform/Select";
import FileInput from "../hookform/FileInput";
import Footer from "../Layout/Footer";
import Header from "../Layout/Hedaer";
import { useDispatch } from "react-redux";
import { registerAction } from "../redux/Auth/actions";
import "../index.css"
import { useNavigate } from "react-router-dom";


const signupSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  role: yup
    .string()
    .oneOf(["superadmin", "workspaceadmin", "employee"], "Invalid role")
    .required("Role is required"),
  company: yup.string().required("company is required"),
  dob: yup.date().required("Date of Birth is required"),
  department: yup.string().required("department is required"),
  mobile: yup
    .string()
    .matches(/^[0-9]+$/, "Mobile number must be digits only")
    .required("Mobile is required"),
  profilePicture: yup.mixed(),
  joiningDate: yup.date().required("Joining Date is required"),
  address:yup.string().required("address is required"),
  companyAddress:yup.string().required("companyAddress is required"),
  experience:yup.string().required("experience is required")
});

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data) => {
  
    const formData = new FormData();
    formData.append('joiningDate',new Date(data.joiningDate).toISOString() );
    formData.append('profilePicture',data.profilePicture[0]);
    formData.append('mobile',data.mobile );
    formData.append('dob', new Date(data.dob).toISOString());
    formData.append('company',data.company );
    formData.append('role', data.role);
    formData.append('password', data.password);
    formData.append('email',data.email ); 
    formData.append('name',data.name );
    formData.append('department',data.department );
    formData.append('address',data.address ); 
    formData.append('companyAddress',data.companyAddress );
    formData.append('experience',data.experience );
  
    dispatch(registerAction(formData))
    reset();
    navigate("/")
  };

  const roleOptions = [
    { value: "superadmin", label: "Superadmin" },
    { value: "workspaceadmin", label: "Workspaceadmin" },
    { value: "employee", label: "Employee" },
  ];

  return (
    <>
      <Header />
      <section className="signup-form-section">
        <h2>Signup</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="signup-form"
          encType="multipart/form-data"
        >
          <Input
            label="Name"
            id="name"
            register={register}
            required={true}
            errors={errors}
          />
          <Input
            label="Email"
            id="email"
            type="email"
            register={register}
            required={true}
            errors={errors}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            register={register}
            required={true}
            errors={errors}
          />
          <Select
            label="Role"
            id="role"
            register={register}
            required={true}
            options={roleOptions}
            errors={errors}
          />
          <Input
            label="Company"
            id="company"
            register={register}
            errors={errors}
          />
          <Input
            label="Date of Birth"
            id="dob"
            type="date"
            register={register}
            required={true}
            errors={errors}
          />
          <Input
            label="Department"
            id="department"
            register={register}
            errors={errors}
          />
          <Input
            label="Mobile"
            id="mobile"
            register={register}
            required={true}
            errors={errors}
          />
           <Input
            label="address"
            id="address"
            register={register}
            required={true}
            errors={errors}
          />
           <Input
            label="companyAddress"
            id="companyAddress"
            register={register}
            required={true}
            errors={errors}
          />
           <Input
            label="experience"
            id="experience"
            register={register}
            required={true}
            errors={errors}
          />
          <FileInput
            label="Profile Picture"
            id="profilePicture"
            register={register}
            errors={errors}
          />
          <Input
            label="Joining Date"
            id="joiningDate"
            type="date"
            register={register}
            required={true}
            errors={errors}
          />
          <button type="submit">Sign Up</button>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default SignupForm;
