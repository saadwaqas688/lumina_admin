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
import ViewAllProducts from "../Components/FormsUI/Product/viewAllProducts";
import ViewAllAdminUsers from "../Components/FormsUI/AdminUsers/viewAllAdminUsers";
import ViewAllOrders from "../Components/FormsUI/Orders/viewAllOrders";
import ViewAllMeals from "../Components/FormsUI/Meal/viewAllMeals";
import SingleMeal from "../Components/FormsUI/Meal/singleMeal";
const ApplicationRoutes = () => {
//   const isLoggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/shop/:id" element={<SingleProduct />} />
      <Route path="/shop" element={<ViewAllProducts/>} />
      <Route path="/adminUsers" element={<ViewAllAdminUsers/>} />
      <Route path="/Users" element={<ViewAllUsers/>} />
      <Route path="/Users/:id" element={<SingleUser/>} />
      <Route path="/orders" element={<ViewAllOrders/>} />
      <Route path="/meal" element={<ViewAllMeals/>} />
      <Route path="/meal/:id" element={<SingleMeal/>} />


      <Route path="/" element={<Login/>} />

    </Routes>
    </BrowserRouter>
  </>
  );
};

export default ApplicationRoutes;
