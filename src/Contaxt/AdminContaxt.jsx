import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContaxt";
import Swal from "sweetalert2"; 


export const AdminContext = createContext();
const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const AdminProvider = ({ children }) => {
  const { authorised, user, token, refreshUserData,setAuthorised } = useAuth();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [likedProducts, setLikedProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    type:"",
  });

  const [update, setUpdate] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    type:"",
   
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdate((prevData) => ({ ...prevData, [name]: value }));
  };

  const fetchProduct = async (_id) => {
    if (!authorised) {
      setError("Unauthorized access");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(
        `${apiUrl}/api/products/product/${_id}`,
        { withCredentials: true }
      );
      if (response.data && response.data.product) {
        setProduct(response.data.product);
        setAuthorised(true);
        setUpdate({
          name: response.data.product.name,
          description: response.data.product.description,
          price: response.data.product.price,
          imageUrl: response.data.product.imageUrl,
          type: response.data.product.type,
        });
      } else {
        setError("Product not found");
      }
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Error fetching product");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!authorised || !product || !user) return;
    try {
      if (!product._id) {
        console.error("Product ID is missing");
        return;
      }
      const response = await axios.post(
        `${apiUrl}/api/admin/products/like/${product._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert("Product liked successfully");
        setIsLiked(true);
        await refreshUserData();
      }
    } catch (error) {
      setError("Error liking product ");
      console.error(
        "Error liking product:",
        error.response?.data || error.message
      );
    }
  };

  const handleAddToCart = async () => {
    if (!authorised || !product || !user) return;

    if (user.Role === "admin") {
      try {
        const response = await axios.post(
          `${apiUrl}/api/admin/products/cart/${product._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          alert("Product added to cart");
          setInCart(true);
          await refreshUserData();
        }
      } catch (error) {
        setError("Error adding product to cart");
        console.error("Error adding product to cart:", error);
      }
    } else {
      setError("Only admins can add a product to the cart");
    }
  };

  const fetchLikedProducts = async () => {
    if (!authorised || !user || !user.LikedProducts?.length) return;
    try {
      const productIds = user.LikedProducts;
      const response = await axios.post(
        `${apiUrl}/api/admin/products/detail`,
        { productIds },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setLikedProducts(response.data.products || []);
    } catch (error) {
      console.error("Error fetching liked products:", error);
      setLikedProducts([]);
    }
  };

  const fetchCartProducts = async () => {
    if (!authorised || !user || !user.Cart?.length) return;

    try {
      const productIds = user.Cart;

      const response = await axios.post(
        `${apiUrl}/api/admin/products/detail`,
        { productIds },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setCartProducts(response.data.products || []);
    } catch (error) {
      console.error("Error fetching cart products:", error);
      setCartProducts([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.Username || !user.Image) {
      setError("Admin details are missing.");
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/api/products/create`,
        {
          ...formData,
          user: {
            name: user.Username,
            image: user.Image,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
         Swal.fire({
                icon: 'success',
                title: 'Product is Created Successfully!',
                text: response.data.message,
              });
        setFormData({
          name: "",
          description: "",
          price: "",
          imageUrl: "",
          type:"",
        });
        console.log("form",formData);
      }
    } catch (error) {
      setError("Error creating product");
      console.error(
        "Error creating product:",
        error.response?.data || error.message
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/admin/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
       Swal.fire({
                icon: 'success',
                title: 'Deleted Successful!',
                text: response.data.message,
              });
      setProduct((prevProducts) => prevProducts.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    console.log("Updating product with ID:", id)
    if (!user || !user.Username || !user.Image) {
      setError("Admin details are missing.");
      return;
    }
  
    try {
      const response = await axios.put(
        `${apiUrl}/api/admin/update/${id}`,
        update,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Product Updated Successfully!',
          text: response.data.message,
        });
        setAuthorised(true);
        setProduct((prevProducts) =>
          prevProducts.map((product) =>
            product._id === id ? { ...product, ...update } : product
          )
        );
        setUpdate({
          name: "",
          description: "",
          price: "",
          imageUrl: "",
          type: "",
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error updating product";
      setError(errorMessage);
      console.error("Error updating product:", errorMessage);
    }
  };
  
  

  return (
    <AdminContext.Provider
      value={{
        product,
        loading,
        error,
        fetchProduct,
        handleLike,
        handleDelete,
        handleAddToCart,
        fetchLikedProducts,
        fetchCartProducts,
        handleSubmit,
        handleChange,
        handleUpdate,
        handleUpdateChange,
        update,
        formData,
        cartProducts,
        likedProducts,
        isLiked,
        inCart,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
