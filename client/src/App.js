import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <>
      <div className="mx-2 h-screen bg-slate-200 my-0">
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
