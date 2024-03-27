import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../LandingPage/Navbar";


const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandler = async (loginData) => {
    console.log(loginData, "loginData");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ECOMMERCE_APP_URL}/login`,
        loginData
      );
      const data = res.data;
      toast.success(data.message);
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      //setIsLoggedIn(true);
      navigate("/");
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };
  return (
    <>
      <ToastContainer autoClose={2000} />
      <Navbar/>
      <div className="flex container mx-auto justify-center place-items-center mt-12">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 border-t-4 border-neutral text-center">
          <h2
            className="text-2xl font-bold my-2 text-slate-400 italic tracking-wider hover:cursor-pointer"
            onClick={() => navigate("/")}
          >
            Ecomm
          </h2>
          <h2 className="text-2xl font-bold my-2 ">Login</h2>
          <form className="card-body" onSubmit={handleSubmit(submitHandler)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input border-1 border-neutral-400"
                //required
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Za-z]+[A-Za-z0-9 -]*/i,
                    message: "Invalid Email",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-400 text-left text-sm ml-1 my-1">
                  {errors?.email?.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input border-1 border-neutral-400"
                required
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-400 text-left text-sm ml-1 my-1">
                  {errors?.password?.message}
                </span>
              )}
              <label className="label">
                <span
                  className="text-neutral-900 font-semibold tracking-wide text-sm hover:underline hover:cursor-pointer"
                  onClick={() => navigate("/resetPwd")}
                >
                  Forgot password?
                </span>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-neutral-900 text-white text-xl">
                Login
              </button>
            </div>
            <div className="flex gap-1 justify-center place-items-center my-1">
              Don't have an account?
              <span
                className="text-neutral-900 font-semibold text-md hover:underline hover:cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Create Account
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
