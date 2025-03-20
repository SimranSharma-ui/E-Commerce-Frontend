import React, { useState } from "react";
import { useAuth } from "../Contaxt/AuthContaxt";
import { useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { BiSolidLeftArrowAlt } from "react-icons/bi";

function Sidebar({ setComponent }) {
  const { user, logout } = useAuth();
  const navigateTo = useNavigate();
  const [show, setShow] = useState(false);

  const handleComponents = (value) => {
    setComponent(value);
    setShow(false); 
  };

  const gotoHome = () => {
    navigateTo("/");
    setShow(false); 
  };

  return (
    <>
  
      <div
        className={` sticky top-0  left-0 h-auto w-80 bg-gradient-to-b from-purple-500 to-indigo-600 text-white z-30 transform transition-transform duration-300 
        `}
      >
    
        <div className="text-center py-8">
          <img
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
            src={user?.Image || "/default-avatar.png"}
            alt="Profile"
          />
          <p className="text-xl font-semibold">{user?.Username || "Guest"}</p>
        </div>

  
        <ul className="space-y-6 px-4">
          <button
            onClick={() => handleComponents("My Liked")}
            className="w-full px-4 py-3 bg-green-500 rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
          >
            My Liked
          </button>
          <button
            onClick={() => handleComponents("Added To Cart")}
            className="w-full px-4 py-3 bg-pink-500 rounded-lg hover:bg-pink-700 transition duration-300 shadow-md"
          >
            My Cart 
          </button>
          <button
            onClick={() => handleComponents("Create Product")}
            className="w-full px-4 py-3 bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
          >
            Create Product
          </button>
          <button
            onClick={() => handleComponents("My Profile")}
            className="w-full px-4 py-3 bg-pink-500 rounded-lg hover:bg-pink-700 transition duration-300 shadow-md"
          >
            My Profile
          </button>
          <button
            onClick={gotoHome}
            className="w-full px-4 py-3 bg-red-500 rounded-lg hover:bg-red-700 transition duration-300 shadow-md"
          >
            Home
          </button>
          <button
            onClick={logout}
            className="w-full px-4 py-3 bg-yellow-500 rounded-lg hover:bg-yellow-700 transition duration-300 shadow-md"
          >
            Logout
          </button>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
