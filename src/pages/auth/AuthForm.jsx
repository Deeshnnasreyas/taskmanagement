import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { login } from "../../redux/userSlice";

const { VITE_AUTH_SERVER } = import.meta.env;

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .when("isRegister", ([isRegister], schema) =>
      isRegister ? schema.required("Confirm Password is required") : schema
    ),
});

const AuthForm = ({ isRegister }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  document.title = isRegister
    ? "Task Management | Register"
    : "Task Management | Login";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { isRegister },
  });

  //  API Call Function
  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      const endpoint = isRegister
        ? `${VITE_AUTH_SERVER}/register`
        : `${VITE_AUTH_SERVER}/login`;
      const response = await axios.post(endpoint, {
        email: data?.email,
        password: data?.password,
      });
      if (!isRegister) {
        localStorage.setItem("token", response?.token); // Store JWT Token
        localStorage.setItem("userId", response?.id);
        dispatch(
          login({
            userId: response?.id,
            token: response?.token,
            islogged: true,
          })
        );
        setLoading(false);
        Swal.fire({
          icon: "success",
          text: "Success",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        localStorage.setItem("token", response?.token);
        localStorage.setItem("userId", response?.id);
        navigate("/login"); // Redirect to login after registration
      }

      navigate(isRegister ? "/login" : "/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
      setLoading(false);
      reset();
      Swal.fire({
        icon: "error",
        text: "Faild",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
            {isRegister ? "Create Account" : "Sign In"}
          </h2>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                {...register("email")}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-gray-700 font-medium">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute top-10 right-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>

            {/* Confirm Password (Only for Registration) */}
            {isRegister && (
              <div className="relative">
                <label className="block text-gray-700 font-medium">
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute top-10 right-3 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword?.message}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Processing..." : isRegister ? "Sign Up" : "Sign In"}
            </button>
          </form>

          {/* Toggle Between Login & Register */}
          <p className="mt-4 text-center text-gray-600">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <a
              href={isRegister ? "/login" : "/register"}
              className="text-blue-600 hover:underline font-medium"
            >
              {isRegister ? "Sign In" : "Sign Up"}
            </a>
          </p>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

//PropTypes Validation
AuthForm.propTypes = {
  isRegister: PropTypes.bool.isRequired,
};

export default AuthForm;
