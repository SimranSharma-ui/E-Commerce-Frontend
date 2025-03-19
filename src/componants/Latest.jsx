import React, { useState } from 'react';
import { useProduct } from '../Contaxt/ProductProvider';

const Latest = () => {
  const { data, loading } = useProduct(); 

  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const lastIndexValue = currentPage * itemsPerPage;
  const firstIndexValue = lastIndexValue - itemsPerPage;

  const currentItems = data.slice(firstIndexValue, lastIndexValue);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); 
  };

  return (
    <div className="container mx-auto px-4 py-8">
      
<div className="bg-gradient-to-r from-purple-700 via-pink-500 to-red-500 text-white py-10 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          Pick Your Product 🚀
        </h1>
        <p className="mt-4 text-lg md:text-xl">Shop your favorite products at unbeatable prices!</p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : (
        <>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                <img 
                  className="w-full h-48 object-cover rounded-lg mb-4" 
                  src={item?.images} 
                  alt={item.Name} 
                />
                <h3 className="text-center text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                <p className="text-center text-sm text-gray-600 mb-2">{item.description}</p>
                <p className="text-center text-lg text-green-600 font-bold">${item.price}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-8">
            <div className="flex gap-4 mb-4 md:mb-0">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 hover:bg-blue-600 transition duration-300"
              >
                Previous
              </button>

              <span className="flex items-center gap-2 text-gray-700 font-medium">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 hover:bg-blue-600 transition duration-300"
              >
                Next
              </button>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">Items per page:</label>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {[6, 12, 18, 24].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Latest;
