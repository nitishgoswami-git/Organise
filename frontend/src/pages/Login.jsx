import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { authApi } from "../api/auth/index";

const LoginPage = () => {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // loading state

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await authApi.login(data);
      setUser(res.data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
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
                pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" },
              })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-white/20 rounded-lg focus:outline-none focus:border-white"
            />
            {errors.Email && <p className="text-red-400 text-xs mt-1">{errors.Email.message}</p>}
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
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-white/20 rounded-lg focus:outline-none focus:border-white"
            />
            {errors.Password && <p className="text-red-400 text-xs mt-1">{errors.Password.message}</p>}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 font-bold rounded-lg shadow transition 
              ${isLoading ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-white text-black hover:bg-gray-100"}`}
          >
            {isLoading ? "Logging in..." : "Login"}
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
