import React, { useEffect, useState } from "react";
import { GoHeartFill } from "react-icons/go";
import { useAdmin } from "../Contaxt/AdminContaxt";
import { Link } from "react-router-dom";
import like from "../assets/Like.png";

function LikedProduct() {
  const { likedProducts, fetchLikedProducts } = useAdmin();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLikedProducts().finally(() => setLoading(false));
  }, []);

  const truncateDescrip = (description, length) => {
    if (description && description.length >= length) {
      return `${description.slice(0, length)}...`;
    }
    return description || "";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <p className="text-lg font-semibold">Loading liked products...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
      <div className="max-w-4xl w-full p-4 bg-white rounded-lg shadow-lg animate-slideRightToLeft">
     
        <h2 className="text-2xl font-semibold mb-6 text-center font-serif">
          Liked Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 ">
          {likedProducts.length > 0 ? (
            likedProducts.map((product) => (
              <Link
                to={`/Product/${product._id}`}
                key={product._id}
                className="group transform hover:scale-105 transition duration-300 ease-in-out"
              >
                <div
                  key={product._id}
                  className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover mb-2 rounded"
                  />
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <p className="text-gray-600">
                    {" "}
                    {truncateDescrip(product.description, 150)}
                  </p>
                  <p className="text-green-500 font-bold">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2">
                    <GoHeartFill className="text-red-600 text-xl" />
                    <span className="text-gray-600 text-sm">
                      {product.likedBy.length} Likes
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-600">
              No liked products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LikedProduct;
