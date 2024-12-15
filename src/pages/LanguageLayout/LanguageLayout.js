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

const LanguageLayout = ({api}) => {
  const [openCategory, setOpenCategory] = useState(false);
  return (
    <>
      <Header api={api}/>
      <Routes>
        <Route path="" element={<Home api={api} setOpenCategory={setOpenCategory}/>} />
        <Route path="/service" element={<Service />} />
        <Route path="/about" element={<About />} />
        <Route path="/products/*" element={<Products api={api} openCategory={openCategory}/>} />
        <Route path="/product/:id" element={<Product api={api} />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      <Footer />
    </>
  );
};

export default LanguageLayout;
