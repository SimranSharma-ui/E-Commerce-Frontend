import React, { useEffect, useState } from "react";
import { useProduct } from "../Contaxt/ProductProvider";
import { Link, useLocation } from "react-router-dom";

const CategoryLocal = () => {
  const { products } = useProduct();
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const category = location.state?.category || "Beauty Brand";
    const filtered = products?.filter((product) => product.type === category);
    setFilteredProducts(filtered);
  }, [location, products]);

  const truncateDescrip = (description, length) => {
    if (description && description.length >= length) {
      return `${description.slice(0, length)}...`;
    }
    return description || "";
  };

  return (
    <>
      <div className="bg-gradient-to-r from-purple-700 via-pink-500 to-red-500 text-white py-10 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
        Explore Our Collections 🚀
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Products in {location.state?.category || "Beauty Brand"} Category
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6  bg-gray-100 animate-slideRightToLeft">
        {filteredProducts?.length > 0 ? (
          filteredProducts.map((product) => (
            <Link
              to={`/Product/${product._id}`}
              key={product._id}
              className="group transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <div
                key={product._id}
                className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
              >
                <div className="overflow-hidden rounded-lg">
                  <img
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-300"
                    src={product.imageUrl}
                    alt={product.name}
                  />
                </div>

                <h3 className="text-xl font-semibold mb-3 text-center group-hover:text-indigo-600 transition">
                  {product.name}
                </h3>
                <p className="mt-4 text-sm text-gray-600 text-center">
                {truncateDescrip(product.description, 200)}
                </p>
                <p className="mt-4 text-lg text-green-600 text-center">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </>
  );
};

export default CategoryLocal;
