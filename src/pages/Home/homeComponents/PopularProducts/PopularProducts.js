import React, { useCallback, useEffect, useState } from "react";
import "./PopularProducts.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../LanguageContext";

export const PopularProducts = ({ api }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const { lang } = useLanguage();

  useEffect(() => {
    axios
      .get(api + "/products/")
      .then((res) => {
        setProducts(res.data.slice(0, 4));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = useCallback(
    (id) => {
      navigate("/product/" + id);
    },
    [navigate]
  );

  return (
    // p_products == popular_products
    <div className="p_products">
      <div className="p_products_actions">
        <h1
          style={
            lang === "ru" ? { fontFamily: "Onest" } : { fontFamily: "Archivo" }
          }
        >
          {lang === "en" ? "Most popular products" : "Популярные продукты"}
        </h1>
        <button
          onClick={() => {
            navigate("/products/all");
          }}
          className="p_products_button"
          style={
            lang === "ru" ? { fontFamily: "Onest" } : { fontFamily: "Archivo" }
          }
        >
          {lang === "en" ? "View all" : "Посмотреть все"}
        </button>
      </div>
      <div className="products_cards">
        {products.map((product, index) => (
          <div className="products_card" key={index}>
            <img src={product.image_url} alt="product" />
            <div className="products_card_content">
              <p className="price">
                {product.price.toLocaleString()} <span>uzs</span>
              </p>
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: 10
              }}>
                <p
                  className="products_name"
                  style={
                    lang === "ru"
                      ? { fontFamily: "Onest" }
                      : { fontFamily: "Archivo" }
                  }
                >
                  {lang === "en" ? product.name_en : product.name_ru}
                </p>
                  <p>
                    {product.part_number}
                  </p>
              </div>
              <button
                onClick={() => handleClick(product.id)}
                style={
                  lang === "ru"
                    ? { fontFamily: "Onest" }
                    : { fontFamily: "Archivo" }
                }
              >
                {lang === "en" ? "View" : "Посмотреть"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
