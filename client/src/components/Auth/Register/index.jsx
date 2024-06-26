import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../LandingPage/Navbar";

const Register = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");

  useEffect(() => {
    if (passwordValue) {
      setPassword(passwordValue);
    }
  }, [passwordValue]);

  const submitHandler = async (registerData) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ECOMMERCE_APP_URL}/register`,
        registerData
      );
      const data = res.data;
      toast.success(data.message);
      navigate("/login");
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <Navbar/>
      <div className="flex container mx-auto justify-center place-items-center mt-4">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 border-t-4 border-neutral text-center">
          <h2
            className="text-2xl font-bold my-2 text-slate-400 italic tracking-wider hover:cursor-pointer"
            onClick={() => navigate("/")}
          >
            Ecomm
          </h2>
          <h2 className="text-2xl font-bold my-2">Register</h2>
          <form className="card-body" onSubmit={handleSubmit(submitHandler)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered border-1 border-neutral-400"
                required
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^[A-Za-z]+[A-Za-z0-9 -]*/i,
                    message: "Invalid Name",
                  },
                })}
              />
              {errors.name && (
                <span className="text-red-400 text-left text-sm ml-1 my-1">
                  {errors?.name?.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered border-1 border-neutral-400"
                required
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
                className="input input-bordered border-1 border-neutral-400"
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
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered border-1 border-neutral-400"
                required
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span className="text-red-400 text-left text-sm ml-1 my-1">
                  {errors?.confirmPassword?.message}
                </span>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-neutral-900 text-white text-xl">
                Register
              </button>
            </div>
            <div className="flex gap-1 justify-center place-items-center my-2">
              Already have an account?
              <span
                className="text-neutral-900 font-semibold text-md hover:underline hover:cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
