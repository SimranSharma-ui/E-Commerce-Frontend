import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContaxt'; 

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { authorised, token,user ,setAuthorised} = useAuth();
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null); 

  const fetchProductsLocal = async () => {
    try {
      if (authorised && token) {
        const response = await axios.get(`${apiUrl}/api/products/getProduct`, {
          withCredentials: true,
        });
       
        setProducts(response.data.products);
      } else {
        setError('You need to log in to see the products.');
        setLoading(false);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setAuthorised(false);
        alert("Session expired. Please log in again.");
      } else {
        console.error('Error fetching products:', err);
        setError('Error fetching products. Please try again later.');
      }
      setLoading(false);
    }
  };
  
  const fetchData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      setData(response.data.products);
      setLoading(false);
    } catch (err) {
      console.log('Error fetching dummy data:', err);
      setLoading(true);
    }
  };

  useEffect(() => {
    if (user && user.role === 'admin') {
      setIsAdmin(true); 
    }
  }, [user]);

  
  useEffect(() => {
    if (authorised) {
      fetchProductsLocal();  
    } else {
      setLoading(false); 
    }
    fetchData();  
  }, [authorised]); 

  const addProduct = async (productData) => {
    if (!isAdmin) {
      return alert('You are not authorized to add products.');
    }
    try {
      const response = await axios.post(`${apiUrl}/api/products/create`, productData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setProducts([...products, response.data]); 
    } catch (err) {
      console.log('Error adding product:', err);
    }
  };

  
  const deleteProduct = async (productId) => {
    if (!isAdmin) {
      return alert('You are not authorized to delete products.');
    }

    try {
      await axios.delete(`${apiUrl}/api/products/Delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setProducts(products.filter((product) => product._id !== productId)); 
    } catch (err) {
      console.log('Error deleting product:', err);
    }
  };

  return (
    <ProductContext.Provider value={{
      products,
      fetchProductsLocal,
      data,
      loading,
      isAdmin,
      addProduct,
      deleteProduct,
      setProducts,
      error, 
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
