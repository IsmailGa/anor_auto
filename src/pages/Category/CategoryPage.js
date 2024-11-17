import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const CategoryPage = ({products}) => {
  const { category } = useParams();
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate("/product/" + id);
  };
  
  const filteredProducts = products.filter(
    (item) => category ? item.category.toLowerCase() === category.toLowerCase() : true
  );

  if(!filteredProducts) {
    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
     Loading products...
    </div>
  }
  return (
    <section >
        <div className="products_cards">
        {filteredProducts.map((product, index) => (
          <div className="products_card" key={index}>
            <img src={product.image_url} alt="product" />
            <div className="products_card_content">
              <p className="price">
                {product.price.toLocaleString()} <span>uzs</span>
              </p>
              <p className="products_name">{product.name_en}</p>
              <button onClick={() => handleClick(product.id)}>Go to product</button>
            </div>
          </div>
        ))}
        </div>
    </section>
  );
};
