import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { authApi } from "../api/auth/index"; // use your API folder

const RegisterPage = () => {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("FirstName", data.FirstName);
      formData.append("LastName", data.LastName);
      formData.append("Email", data.Email);
      formData.append("Password", data.Password);
      formData.append("photo", data.photo[0]);

      const res = await authApi.register(formData); // API call
      setUser(res.data); // update Zustand store
      navigate("/dashboard");
    } catch (err) {
      console.log("Registration error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-700 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-black text-white p-8 rounded-2xl shadow-2xl border border-white/10">
        <h1 className="text-3xl font-bold text-center mb-8">Register</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputField
            label="First Name"
            placeholder="Enter first name"
            {...register("FirstName", { required: "First name is required" })}
            error={errors.FirstName}
          />
          <InputField
            label="Last Name"
            placeholder="Enter last name"
            {...register("LastName", { required: "Last name is required" })}
            error={errors.LastName}
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            {...register("Email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" },
            })}
            error={errors.Email}
          />
          <InputField
            type="password"
            label="Password"
            placeholder="••••••••"
            {...register("Password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            error={errors.Password}
          />

          <div>
            <label className="block mb-2 text-sm font-semibold">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              {...register("photo", { required: "Photo is required" })}
              className="w-full text-sm text-gray-300
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-white file:text-black
                         hover:file:bg-gray-200"
            />
            {errors.photo && <p className="text-red-400 text-xs mt-1">{errors.photo.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-white text-black font-bold rounded-lg shadow hover:bg-gray-100 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-300 mt-6">
          Already have an account?{" "}
          <a href="/login" className="underline text-white">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

const InputField = ({ label, error, ...rest }) => (
  <div>
    <label className="block mb-2 text-sm font-semibold">{label}</label>
    <input
      {...rest}
      className="w-full px-4 py-2 bg-gray-800 text-white border border-white/20 rounded-lg focus:outline-none focus:border-white"
    />
    {error && <p className="text-red-400 text-xs mt-1">{error.message}</p>}
  </div>
);

export default RegisterPage;
