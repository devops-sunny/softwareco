import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Footer from "../Layout/Footer";
import Header from "../Layout/Hedaer";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/Auth/actions";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Input = ({ label, id, type = "text", register, required, errors }) => {
  return (
    <div className="form-row">
      <label htmlFor={id}>
        {label}
        {required && "*"}
      </label>
      <input id={id} type={type} {...register(id, { required })} />
      {errors[id] && <p className="error-message">{errors[id]?.message}</p>}
    </div>
  );
};

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    dispatch(loginAction(data, navigate));
  };

  return (
    <>
      <Header />
      <section className="login-form-section">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
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
          <p><a href="/signup">signup</a></p>
          <button type="submit">Login</button>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default LoginForm;
