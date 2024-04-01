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
import ProtectedRoutes from "./Routes/ProtectedRoutes";

function App() {
  const token = sessionStorage.getItem("token");

  return (
    <>
      <div className="mx-2 h-full bg-slate-200 my-0">
        <Routes>
          {token ? (
            <Route
              exact
              path="/"
              element={
                <ProtectedRoutes exact path="/" element={<LandingPage />} />
              }
            />
          ) : (
            <Route exact path="/" element={<LandingPage />} />
          )}
          {token ? (
            <Route
              path="/login"
              element={<ProtectedRoutes path="/login" element={<Login />} />}
            />
          ) : (
            <Route path="/login" element={<Login />} />
          )}
          {token ? (
            <Route
              path="/register"
              element={
                <ProtectedRoutes path="/register" element={<Register />} />
              }
            />
          ) : (
            <Route path="/register" element={<Register />} />
          )}
          {token ? (
            <Route
              path="/resetPwd"
              element={
                <ProtectedRoutes path="/resetPwd" element={<ResetPwd />} />
              }
            />
          ) : (
            <Route path="/resetPwd" element={<ResetPwd />} />
          )}
          {token ? (
            <Route
              path="/about"
              element={<ProtectedRoutes path="/about" element={<About />} />}
            />
          ) : (
            <Route path="/about" element={<About />} />
          )}
          {token ? (
            <Route
              path="/products"
              element={
                <ProtectedRoutes path="/products" element={<Products />} />
              }
            />
          ) : (
            <Route path="/products" element={<Products />} />
          )}
          {token ? (
            <Route
              path="/product/:id"
              element={
                <ProtectedRoutes
                  path="/product/:id"
                  element={<SingleProduct />}
                />
              }
            />
          ) : (
            <Route path="/product/:id" element={<SingleProduct />} />
          )}
          (
          <Route
            path="/cart"
            element={<ProtectedRoutes path="/cart" element={<Cart />} />}
          />
          )
        </Routes>
      </div>
    </>
  );
}

export default App;
