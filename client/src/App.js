import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ResetPwd from "./components/Auth/ResetPwd";
import About from "./components/About";
import Products from "./components/Products";
import Cart from "./components/Cart";
import SingleProduct from "./components/Products/SingleProduct";

function App() {
  return (
    <>
      <div className="mx-2 h-full bg-slate-200 my-0">
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resetPwd" element={<ResetPwd />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
