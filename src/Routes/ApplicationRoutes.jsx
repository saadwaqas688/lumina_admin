import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import SingleProductDetails from "../Components/FormsUI/SingleProductDetails/singleProductDetails";
import ProductDetails from "../Components/FormsUI/ProductDetails/productDetails"
import ManageAdminUsers from "../Components/FormsUI/AdminUsers/manageAdminUsers";
import Login from "../Components/FormsUI/Login/login";
const ApplicationRoutes = () => {
//   const isLoggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/shop/:id" element={<SingleProductDetails />} />
      <Route path="/shop" element={<ProductDetails/>} />
      <Route path="/adminUsers" element={<ManageAdminUsers/>} />
      <Route path="/login" element={<Login/>} />

    </Routes>
    </BrowserRouter>
  </>
  );
};

export default ApplicationRoutes;
