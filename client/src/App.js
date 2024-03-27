import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ResetPwd from "./components/Auth/ResetPwd";
import About from "./components/About";


function App() {
  return (
    <>
      <div className="mx-2 h-screen bg-slate-200 my-0">
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/resetPwd" element={<ResetPwd />} />
          <Route path="/about" exact element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
