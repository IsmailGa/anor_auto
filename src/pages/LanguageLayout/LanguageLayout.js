// LanguageLayout.js
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Home } from "../Home/Home";
import { Service } from "../Service/Service";
import Product from "../Products/Product/Product";
import { Products } from "../Products/Products";
import { About } from "../About/About";

const LanguageLayout = () => {
  const [openCategory, setOpenCategory] = useState(false);
  return (
    <>
      <Header />
      <Routes>
        <Route path="" element={<Home setOpenCategory={setOpenCategory}/>} />
        <Route path="/service" element={<Service />} />
        <Route path="/about" element={<About />} />
        <Route path="/products/*" element={<Products openCategory={openCategory}/>} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      <Footer />
    </>
  );
};

export default LanguageLayout;
