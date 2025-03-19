import React, { useState, useEffect } from "react";
import { useAuth } from "../Contaxt/AuthContaxt";
import Sidebar from "../Dashboard/Sidebar";
import AdminInfo from "../Dashboard/AdminInfo";
import Create from "../Dashboard/Create";
import CartProduct from "../Dashboard/CartProduct";
import LikedProduct from "../Dashboard/LikedProduct";


function Dashboard() {
  const {user,authorised} = useAuth();
  const [component, setComponent] = useState("My Profile");


  return (
    <div className="dashboard-container flex">
      <Sidebar component={component} setComponent={setComponent} />
      <div className="dashboard-content flex-1">
        {component === "My Liked" ? (
          <LikedProduct />
        ) : component === "Create Product" ? (
          <Create />
        ) : component === "Added To Cart" ? (
          <CartProduct />
        ) : (
          <AdminInfo />
        )}
      </div>
    </div>
  );
}

export default Dashboard;