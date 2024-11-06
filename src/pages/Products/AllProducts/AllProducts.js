import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AllProducts.css";
import { useLanguage } from "../../LanguageContext";

export const AllProducts = ({ products }) => {
  const navigate = useNavigate();
  const handleClick = useCallback(
    (id) => {
      navigate("/product/" + id);
    },
    [navigate]
  );

  const { lang } = useLanguage();

  if (!products) {
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      } &&
      lang === "ru"
      ? { fontFamily: "Onest" }
      : { fontFamily: "Archivo" }
    }
    >
      {lang === "en" ? "Loading products..." : "Загружаем продукты..."}
    </div>;
  }

  return (
    <div className="all_products">
      <div className="products_cards">
        {products.map((product, index) => (
          <div className="products_card" key={index}>
            <img src={product.image_url} alt="product" />
            <div className="products_card_content">
              <p className="price">
                {product.price.toLocaleString()} <span>uzs</span>
              </p>
              <p className="products_name">{product.name_en}</p>
              <button
                onClick={() => handleClick(product.id)}
                style={
                  lang === "ru"
                    ? { fontFamily: "Onest" }
                    : { fontFamily: "Archivo" }
                }
              >
                {lang === "en" ? "View Product" : "Посмотреть Продукт"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
