// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./page/LoginPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/forgot-password"
          element={<div>Forgot Password Page (TBD)</div>}
        />
        <Route path="/register" element={<div>Register Page (TBD)</div>} />
        <Route path="/dashboard" element={<div>User Dashboard (TBD)</div>} />
        <Route
          path="/supplier-dashboard"
          element={<div>Supplier Dashboard (TBD)</div>}
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
