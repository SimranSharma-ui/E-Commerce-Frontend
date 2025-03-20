import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/shopping-couple.png";
import { useAuth } from '../Contaxt/AuthContaxt';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { authorised, user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleCategorySelect = (category) => {
    setIsDropdownOpen(false);
    closeMenu();
    navigate('/CategoryLocal', { state: { category } }); 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gray-800 py-4">
      <nav className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between">
       
          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt="UrbanMart"
              className="h-9 w-8 hover:scale-110 transition-transform duration-300 cursor-pointer"
            />
            <h1 className="text-white text-3xl font-bold">UrbanMart</h1>
          </div>

          <button className="md:hidden text-2xl text-white" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

       
          <ul
            className={`md:flex md:space-x-6 font-serif z-40 absolute md:static left-0 w-full md:w-auto
            bg-gray-900 md:bg-transparent transition-all duration-300 ease-in-out 
            ${menuOpen ? 'top-16 opacity-100 visible p-6' : 'top-[-400px] opacity-0 invisible'} 
            md:opacity-100 md:visible`}
          >
            <li>
              <Link to="/" className="text-white text-lg uppercase hover:text-teal-500" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/Product" className="text-white text-lg uppercase hover:text-teal-500" onClick={closeMenu}>
                Demos
              </Link>
            </li>
            <li>
              <Link to="/Latest" className="text-white text-lg uppercase hover:text-teal-500" onClick={closeMenu}>
                Latest
              </Link>
            </li>

        
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="text-white text-lg uppercase cursor-pointer hover:text-teal-500"
              >
                Categories
              </button>
              {isDropdownOpen && (
                <div className="absolute bg-gray-700 text-white w-48 mt-2 rounded-lg shadow-lg z-50">
                  {["Beauty Brand", "Women'Clothes", "Men'Clothes", "Electronics", "Mobiles", "Shoes"].map(
                    (category, index) => (
                      <button
                        key={index}
                        onClick={() => handleCategorySelect(category)}
                        className="block px-4 py-2 hover:bg-teal-500 w-full text-left"
                      >
                        {category}
                      </button>
                    )
                  )}
                </div>
              )}
            </li>

       
            {authorised && user?.Role === "admin" && (
              <Link
                to="/Dashboard"
                className="py-2 px-4 bg-teal-500 text-white text-sm font-bold rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
                onClick={closeMenu}
              >
                Dashboard
              </Link>
            )}

            {!authorised ? (
              <Link
                to="/Login"
                className="py-2 px-4 bg-gray-600 text-white text-sm font-bold rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
                onClick={closeMenu}
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="py-2 px-4 bg-red-500 text-white text-sm font-bold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
