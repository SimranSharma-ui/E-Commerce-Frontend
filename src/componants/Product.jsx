import React, { useState } from "react";
import { GoHeartFill } from "react-icons/go";
import { BsCartCheckFill } from "react-icons/bs";
import { useAuth } from "../Contaxt/AuthContaxt";
import { useProduct } from "../Contaxt/ProductProvider";
import { Link } from "react-router-dom";

const Product = () => {
  const { authorised } = useAuth();
  const { products, loading } = useProduct();
  const Products = products.slice(0,8);
  
  const truncateDescrip = (description, length) => {
    if (description && description.length >= length) {
      return `${description.slice(0, length)}...`;
    }
    return description || "";
  };

  if (loading) {
    return <div className="text-center text-lg text-gray-600">Loading products...</div>;
  }

  if (!authorised) {
    return <div className="text-center text-lg text-red-500">You must be logged in to view products.</div>;
  }

  return (
    <>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-700 via-pink-500 to-red-500 text-white py-10 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          Blockbuster Deals on Accessories 🚀
        </h1>
        <p className="mt-4 text-lg md:text-xl">Shop your favorite products at unbeatable prices!</p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-gray-100 animate-fadeInFromBottom">
        {Products && Products.length > 0 ? (
          Products.map((item) => (
            <Link
              to={`/Product/${item._id}`}
              key={item._id}
              className="group transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <div className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
              
                <h2 className="text-xl font-semibold mb-3 text-center group-hover:text-indigo-600 transition">
                  {item.name}
                </h2>

              
                <div className="overflow-hidden rounded-lg">
                  <img
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-300"
                    src={item.imageUrl}
                    alt={item.name}
                  />
                </div>

             
                <h3 className="mt-3 text-center text-gray-500">{item.type}</h3>
                <h3 className="text-green-600 mt-2 text-center text-xl font-bold">
                  ${item.price}
                </h3>

                
                <p className="mt-4 text-sm text-gray-600 text-center">
                  {truncateDescrip(item.description, 100)}
                </p>

               
               

                <div className="flex justify-between items-center mt-6">
                  <div className="flex items-center gap-2">
                    <GoHeartFill className="text-red-500 text-xl" />
                    <span className="text-gray-600 text-sm">
                      {item.likedBy.length} Likes
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BsCartCheckFill className="text-blue-500 text-xl" />
                    <span className="text-gray-600 text-sm">In Cart</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center text-lg text-gray-500">No products available.</div>
        )}
      </div>
    </>
  );
};

export default Product;
