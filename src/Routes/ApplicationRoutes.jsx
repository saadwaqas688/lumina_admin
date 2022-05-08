import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import Login from "../Components/FormsUI/Login/login";
import ViewAllUsers from "../Components/FormsUI/Users/viewAllUsers";
import SingleUser from "../Components/FormsUI/Users/singleUser";
import SingleProduct from "../Components/FormsUI/Product/singleProduct";
import ProductDetails from "../Components/FormsUI/Product/productDetails";
import ViewAllAdminUsers from "../Components/FormsUI/AdminUsers/viewAllAdminUsers";
const ApplicationRoutes = () => {
//   const isLoggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/shop/:id" element={<SingleProduct />} />
      <Route path="/shop" element={<ProductDetails/>} />
      <Route path="/adminUsers" element={<ViewAllAdminUsers/>} />
      <Route path="/Users" element={<ViewAllUsers/>} />
      <Route path="/Users/:id" element={<SingleUser/>} />


      <Route path="/" element={<Login/>} />

    </Routes>
    </BrowserRouter>
  </>
  );
};

export default ApplicationRoutes;
