// LanguageLayout.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Home } from "../Home/Home";
import { Service } from "../Service/Service";
import Product from "../Products/Product/Product";
import { Products } from "../Products/Products";

const LanguageLayout = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/service" element={<Service />} />
        <Route path="/products/*" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      <Footer />
    </>
  );
};

export default LanguageLayout;
