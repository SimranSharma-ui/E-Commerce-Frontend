import React from "react";
import { useAuth } from "../Contaxt/AuthContaxt";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { loginData, handleChangeLogin, handleSubmitLogin } = useAuth();


  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center"  style={{
      backgroundImage:
        "url('https://themes.halothemes.com/html/ella-html-demo/assets/images/banners/home/home-2/banner-slide.jpg')",
    }}>
      <div className="max-w-md w-full p-8 bg-white bg-opacity-60 rounded-lg shadow-lg ">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>

      <form onSubmit={handleSubmitLogin}>
        {/* Email Input */}
        <div className="mb-6">
          <label
            htmlFor="Email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="Email"
            name="Email"
            value={loginData.Email}
            onChange={handleChangeLogin}
            placeholder="Enter your email"
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label
            htmlFor="Password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="Password"
            name="Password"
            value={loginData.Password}
            onChange={handleChangeLogin}
            placeholder="Enter your password"
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </div>

        {/* Register Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Not registered? 
            <Link 
              to="/Register" 
              className="text-indigo-600 font-medium hover:underline ml-1"
            >
              Register here
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
           forget Password 
            <Link 
              to="/ForgetPassword" 
              className="text-indigo-600 font-medium hover:underline ml-1"
            >
             Click here
            </Link>
          </p>
        </div>

      </form>
      </div>
    </div>
  );
};

export default LoginForm;
