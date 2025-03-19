import React from "react";
import { useAuth } from "../Contaxt/AuthContaxt";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const {
    registerData,
    handleChangeRegister,
    handleFileChange,
    handleSubmitRegister,
  } = useAuth();
 

  return (
    <div
      className="min-h-screen flex items-center justify-start bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://themes.halothemes.com/html/ella-html-demo/assets/images/banners/home/home-2/slider-02.jpg')",
      }}
    >
      <div className="max-w-md w-full p-8 bg-white bg-opacity-60 rounded-lg shadow-lg ml-20">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Register</h2>

        <form onSubmit={handleSubmitRegister}>
          <div className="mb-4">
            <label
              htmlFor="Username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="Username"
              name="Username"
              value={registerData.Username}
              onChange={handleChangeRegister}
              placeholder="Enter your username"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="Email"
              name="Email"
              value={registerData.Email}
              onChange={handleChangeRegister}
              placeholder="Enter your email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="Password"
              name="Password"
              value={registerData.Password}
              onChange={handleChangeRegister}
              placeholder="Enter your password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-600"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={registerData.role}
              onChange={handleChangeRegister}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-600"
            >
              Profile Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
