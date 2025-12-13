import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

const LoginPage = () => {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Login Data:", data);
    // send to backend using axios/fetch
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        {
          email: data.Email,
          password: data.Password,
        },
        {
          withCredentials: true, // if backend sets JWT cookies
        }
      );

      console.log(res.data);

      // Hydrate store with user data
      setUser(res.data.data);
      navigate("/dashboard");
    } catch (err) {
      console.log("error:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-700 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-black text-white p-8 rounded-2xl shadow-2xl border border-white/10">
        <h1 className="text-3xl font-bold text-center mb-8">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-semibold">Email</label>
            <input
              {...register("Email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
              className="w-full px-4 py-2 bg-gray-800 text-white border border-white/20 rounded-lg focus:outline-none focus:border-white"
              placeholder="Enter your email"
            />
            {errors.Email && (
              <p className="text-red-400 text-xs mt-1">
                {errors.Email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-semibold">Password</label>
            <input
              type="password"
              {...register("Password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              className="w-full px-4 py-2 bg-gray-800 text-white border border-white/20 rounded-lg focus:outline-none focus:border-white"
              placeholder="••••••••"
            />
            {errors.Password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.Password.message}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 bg-white text-black font-bold rounded-lg shadow hover:bg-gray-100 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-300 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="underline text-white">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
