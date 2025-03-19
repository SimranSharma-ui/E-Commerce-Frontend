import React, { useEffect } from "react";
import { useAuth } from "../Contaxt/AuthContaxt";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { setPassword, ResetPassword, password } = useAuth();
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      ResetPassword(token);
    }
  }, [token]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://themes.halothemes.com/html/ella-html-demo/assets/images/banners/home/home-2/banner-slide.jpg')",
      }}
    >
      <div className="max-w-md w-full p-8 bg-white bg-opacity-60 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Reset Password
        </h2>

        <form
          onSubmit={(e) => {
            ResetPassword(e, token);
          }}
        >
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
