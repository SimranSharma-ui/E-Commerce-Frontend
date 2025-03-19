import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdmin } from "../Contaxt/AdminContaxt";

const Update = () => {
  const { handleUpdateChange, handleUpdate, update } = useAdmin();
  const { id } = useParams(); 
   const NavigateTo = useNavigate();
   
   useEffect(()=>{
       handleUpdate(id);
   },[id]);

   const Handleupdate = async (e) => {
    e.preventDefault(); 
    await handleUpdate(e, id); 
    NavigateTo('/Product'); 
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Update a New Product
        </h2>
        <form onSubmit={Handleupdate} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={update.name}
              onChange={handleUpdateChange}
              required
              className="block w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={update.description}
              onChange={handleUpdateChange}
              required
              className="block w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
              placeholder="Enter product description"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={update.price}
              onChange={handleUpdateChange}
              required
              step="0.01"
              className="block w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
              placeholder="Enter product price"
            />
          </div>

          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={update.imageUrl}
              onChange={handleUpdateChange}
              required
              className="block w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
              placeholder="Enter image URL"
            />
          </div>

          <div>
            <label htmlFor='type'className="block text-sm font-medium text-gray-700 mb-1" >Type</label>
          <select
              type=""
              id='type'
              name="type"
              value={update.type}
              onChange={handleUpdateChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">Select Category</option>
              <option value="Beauty Brand">Beauty Brand</option>
              <option value="Women'Clothes">Women'Clothes</option>
              <option value="Men'Clothes">Men'Clothes</option>
              <option value="Electronics">Electronics</option>
              <option value="Mobiles">Mobiles</option>
            </select>
            </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
