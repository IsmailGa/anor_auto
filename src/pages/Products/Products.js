// src/pages/Products/Products.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import { AllProducts } from "./AllProducts/AllProducts.js";
import { SalesProducts } from "./SalesProducts/SalesProducts.js";
import { NewProducts } from "./NewProducts/NewProducts.js";
import { Reviews } from "../Home/homeComponents/Review/Review.js";
import { Partners } from "../Home/homeComponents/Partners/Partners.js";
import "./Products.css";
import { CategoryPage } from "../Category/CategoryPage.js";
import PreLoader from "../../components/Pre/Pre.js";
import { useLanguage } from "../LanguageContext.js";

export const Products = () => {
  const { lang } = useLanguage();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:6060/api/products/")
      .then((res) => {
        setProducts(res.data);
        const uniqueCategories = [
          ...new Set(res.data.map((item) => item.category)),
        ];
        setCategory(uniqueCategories);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <section className="products">
      <div className="container">
        <h1
          className="products_title"
          style={
            lang === "ru" ? { fontFamily: "Onest" } : { fontFamily: "Archivo" }
          }
        >
          {lang === "en" ? "Products" : "Продукты"}
        </h1>
        <div className="products_options">
          <NavLink
            to="all"
            className={({ isActive }) =>
              isActive ? "button active" : "button"
            }
            style={
              lang === "ru"
                ? { fontFamily: "Onest" }
                : { fontFamily: "Archivo" }
            }
          >
           {lang === "en" ? "All Products" : "Все Продукты"} 
          </NavLink>
          <NavLink
            to="sales"
            className={({ isActive }) =>
              isActive ? "button active" : "button"
            }
            style={
              lang === "ru"
                ? { fontFamily: "Onest" }
                : { fontFamily: "Archivo" }
            }
          >
            {lang === "en" ? "Sales" : "Продажи"} 
          </NavLink>
          <NavLink
            to="new"
            className={({ isActive }) =>
              isActive ? "button active" : "button"
            }
            style={
              lang === "ru"
                ? { fontFamily: "Onest" }
                : { fontFamily: "Archivo" }
            }
          >
            {lang === "en" ? "New Products" : "Новые"}
          </NavLink>
        </div>
        <ul className="category_links">
          {category.map((item) => (
            <li>
              <NavLink to={`category/${item.toLowerCase()}`}>
                - {item.toUpperCase()}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="products_content">
          <PreLoader load={isLoading} />
          <Routes>
            <Route path="/" element={<Navigate to="all" replace />} />
            <Route path="all" element={<AllProducts products={products} />} />
            <Route
              path="category/:category"
              element={<CategoryPage products={products} />}
            />
            <Route path="sales" element={<SalesProducts />} />
            <Route path="new" element={<NewProducts />} />
            {/* Add a fallback route for 404 if needed */}
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </div>
        <Partners />
      </div>
    </section>
  );
};
