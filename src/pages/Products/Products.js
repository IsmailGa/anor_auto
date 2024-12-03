import React, { useState, useEffect, useMemo } from "react";
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
import { MapLocation } from "../Home/homeComponents/Location/Location.js";

export const Products = ({ openCategory }) => {
  const { lang } = useLanguage();
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const titleStyle = { fontFamily: lang === "ru" ? "Onest" : "Archivo" };
  const categoryStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:6060/api/products/")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
        setIsOpen(openCategory);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const categories = useMemo(
    () => [
      { key: "oils", en: "Oils", ru: "Масла" },
      { key: "tires", en: "Tires", ru: "Шины" },
      { key: "filters", en: "Filters", ru: "Фильтры" },
      { key: "bearings", en: "Bearings", ru: "Подшипники" },
      { key: "battery", en: "Battery", ru: "Аккумуляторы" },
      { key: "other", en: "Other", ru: "Прочее" },
    ],
    []
  );

  const navLinks = useMemo(
    () => [
      { to: "all", label: lang === "en" ? "All Products" : "Все Продукты" },
      // { to: "sales", label: lang === "en" ? "Sales" : "Акции" },
      // { to: "new", label: lang === "en" ? "New Products" : "Новые" },
    ],
    [lang]
  );
  const langStyle = { fontFamily: lang === "ru" ? "Onest" : "Archivo" };

  return (
    <section className="products">
      <div className="container">
        <h1 className="products_title" style={titleStyle}>
          {lang === "en" ? "Products" : "Продукты"}
        </h1>
        <div className="products_options">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive ? "button active" : "button"
              }
              style={titleStyle}
            >
              {label}
            </NavLink>
          ))}
        </div>
        <div style={categoryStyle}>
          <button
            className={isOpen ? "p_c_btn active" : "p_c_btn"}
            onClick={() => setIsOpen(!isOpen)}
            style={
              lang === "ru"
                ? { fontFamily: "Onest" }
                : { fontFamily: "Archivo" }
            }
          >
            {lang == "en"
              ? !isOpen
                ? "Open all categories"
                : "Close all categories"
              : !isOpen
              ? "Открыть все категории"
              : "Закрыть все категори"}
          </button>
          <ul
            className={
              isOpen
                ? "products_category_links open"
                : "products_category_links"
            }
          >
            {categories.map(({ key, en, ru }) => (
              <li key={key}>
                <NavLink to={`category/${key}`} style={langStyle}>
                  {lang === "en" ? en : ru}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="products_content">
          <PreLoader load={isLoading} />
          <Routes>
            <Route path="/" element={<Navigate to="all" replace />} />
            <Route path="all" element={<AllProducts products={products} />} />
            <Route
              path="category/:category"
              element={<CategoryPage products={products} />}
            />
            {/* <Route
              path="sales"
              element={<SalesProducts products={products} />}
            />
            <Route path="new" element={<NewProducts products={products} />} /> */}
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </div>
        <Partners />
        <MapLocation />
      </div>
    </section>
  );
};
