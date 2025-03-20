import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAdmin } from "../Contaxt/AdminContaxt";

const DetailProduct = () => {
  const { id } = useParams();
  const {
    product,
    loading,
    error,
    fetchProduct,
    handleLike,
    handleAddToCart,
    isLiked,
    inCart,
    handleDelete,
  } = useAdmin();
  const NavigateTo = useNavigate()
  
  useEffect(() => {
    fetchProduct(id);
  }, []);

  const handleDeleteAndRedirect = async (productId) => {
    await handleDelete(productId); 
    NavigateTo('/Product'); 
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-gray-700">No product found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
       <div className="bg-gradient-to-r from-purple-700 via-pink-500 to-red-500 text-white py-10 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          Detailed Info 
        </h1>
        
      </div>
      <div className="grid md:grid-cols-2 gap-12 bg-white rounded-lg shadow-lg overflow-hidden">
       
        <div className="bg-gray-100 flex justify-center items-center p-6">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="rounded-lg shadow-lg w-full max-w-md object-cover"
          />
        </div>

       
        <div className="p-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-lg text-gray-700 mb-6">{product.description}</p>
          <p className="text-2xl font-semibold text-green-600 mb-6">${product.price}</p>
           <p className="text-2xl font-semibold text-blue-600 mb-6">Created By: {product.admin?.name}</p>
          
          <div className=" grid grid-cols-2 gap-6 ">
            <button
              onClick={handleLike}
              className={`w-full py-3 px-4 rounded-lg shadow-md transition-colors text-white font-semibold text-lg ${
                isLiked ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLiked ? "Liked" : "Like"}
            </button>

            <button
              onClick={handleAddToCart}
              className={`w-full py-3 px-4 rounded-lg shadow-md transition-colors text-white font-semibold text-lg ${
                inCart ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {inCart ? "In Cart" : "Add to Cart"}
            </button>

            <button
              onClick={() => handleDeleteAndRedirect(product._id)}
              className="w-full py-3 px-4 rounded-lg shadow-md bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold text-lg"
            >
              Delete
            </button>
            <Link to={`/update/${product._id}`}>
            <button onClick={() => fetchProduct(product._id)}
              className="w-full py-3 px-4 mt-3 rounded-lg shadow-md bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold text-lg"
            >
             update
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
