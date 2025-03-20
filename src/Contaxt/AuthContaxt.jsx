import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2"; 
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    Username: "",
    Email: "",
    Password: "",
    image: null,
    role: "",
  });

  const [loginData, setLoginData] = useState({
    Email: "",
    Password: "",
  });

  

  const [authorised, setAuthorised] = useState(
    !!Cookies.get("token") || !!localStorage.getItem("token")
  );
  const [token, setToken] = useState(
    Cookies.get("token") || localStorage.getItem("token") || null
  );
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("User");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setRegisterData({
      ...registerData,
      image: file,
    });
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (
      !registerData.Username ||
      !registerData.Email ||
      !registerData.Password ||
      !registerData.image ||
      !registerData.role
    ) {
      alert("Please fill all the fields.");
      return;
    }

    const formData = new FormData();
    formData.append("Username", registerData.Username);
    formData.append("Email", registerData.Email);
    formData.append("Password", registerData.Password);
    formData.append("image", registerData.image);
    formData.append("role", registerData.role);

    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/Register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: response.data.message,
      });
      setRegisterData({
        Username: "",
        Email: "",
        Password: "",
        image: null,
        role: "",
      });
      document.getElementById("image").value = "";
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed!',
        text: error.response ? error.response.data.message : "An error occurred",
      });
    }
  };

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (!loginData.Email || !loginData.Password) {
      alert("Please enter both email and password.");
      return;
    }
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/Login`,
        loginData,
        { withCredentials: true }
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        Cookies.set("token", response.data.token);
        setToken(response.data.token);
        setAuthorised(true);
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: response.data.message,
        });
        navigate("/Product");

        const userResponse = await axios.get(
          `${apiUrl}/api/user/getUser`,
          { withCredentials: true }
        );
        localStorage.setItem("User", JSON.stringify(userResponse.data));
        setUser(userResponse.data);
      }
    } catch (error) {
      setAuthorised(false);
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed!',
        text: error.response ? error.response.data.message : "An error occurred",
      });
    }
  };

  const logout = async (e) => {
    if (e) e.preventDefault();
    try {
      await axios.get(`${apiUrl}/api/auth/Logout`, {
        withCredentials: true,
      });
      Cookies.remove("token");
      localStorage.removeItem("token");
      setToken(null);
      setAuthorised(false);
      alert("Logout Successful");
      navigate("/Login");
    } catch (err) {
      console.log("Error logging out:", err);
      alert("Error during logout");
    }
  };

  const refreshUserData = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/user/getUser`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setUser(response.data);
      localStorage.setItem("User", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  };


 
 
  const [email,setEmail] = useState("");

  const SendPassword = async (e) => {
    e.preventDefault();
    
    try {
        const response = await axios.post(
            `${apiUrl}/api/auth/ForgetPassword`,
            { email } 
        );
        console.log(response.data);
        alert("Password reset email sent successfully!"); 
    } catch (error) {
        console.error("Error sending password reset email:", error);
        alert("Failed to send reset email. Please try again.");
    }
};

const HandleChange = (e) => {
    setEmail(e.target.value);
};



const [password,setPassword] = useState("");

const ResetPassword = async(e ,token)=>{
  e.preventDefault();
  try {
      const response = await axios.post(
          `${apiUrl}/api/auth/ResetPassword/${token}`,
          {password } 
      );
      console.log(response.data);
       navigate('/Login');
      alert("Password reset email sent successfully!"); 
  } catch (error) {
      console.error("Error sending password reset email:", error);
      alert("Failed to send reset email. Please try again.");
  }
}


  return (
    <AuthContext.Provider
      value={{
        registerData,
        loginData,
        authorised,
        setAuthorised,
        token,
        user,
        setLoginData,
        handleChangeRegister,
        handleFileChange,
        handleSubmitRegister,
        handleChangeLogin,
        handleSubmitLogin,
        logout,
        refreshUserData,
        email,
        SendPassword,
        HandleChange,
        setPassword,
        ResetPassword,
        password
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
