import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-700 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-black text-white p-8 rounded-2xl shadow-2xl border border-white/10">
        <h1 className="text-3xl font-bold text-center mb-8">Login</h1>

        <form className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-semibold">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-white/20 rounded-lg focus:outline-none focus:border-white"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-white/20 rounded-lg focus:outline-none focus:border-white"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-white text-black font-bold rounded-lg shadow hover:bg-gray-100 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-300 mt-6">
          Don't have an account?{" "}
          <a href="#" className="underline text-white">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
