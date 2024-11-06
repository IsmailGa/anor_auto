import React from "react";
import airFilter from "../../../../assets/air_filter.jpg";
import { NavLink } from "react-router-dom";

export const SeasonProducts = () => {
  return (
    // p_products == popular_products
    <div className="p_products">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          width: "100%",
        }}
      >
        <h1>Most popular products</h1>
        <NavLink to="/products/sales" className="p_products_button">
          View All
        </NavLink>
      </div>
      <div className="products_cards">
      <div className="products_card">
          <img src={airFilter} alt="image" />
          <div className="products_card_content">
            <p className="price">
              399.999,99 <span>uzs</span>
            </p>
            <p className="products_name">Air Filter (SCT) 3000</p>

            <button>Add To Cart</button>
          </div>
        </div>
        <div className="products_card">
          <img src={airFilter} alt="image" />
          <div className="products_card_content">
            <p className="price">
              399.999,99 <span>uzs</span>
            </p>
            <p className="products_name">Air Filter (SCT) 3000</p>

            <button>Add To Cart</button>
          </div>
        </div>
        <div className="products_card">
          <img src={airFilter} alt="image" />
          <div className="products_card_content">
            <p className="price">
              399.999,99 <span>uzs</span>
            </p>
            <p className="products_name">Air Filter (SCT) 3000</p>

            <button>Add To Cart</button>
          </div>
        </div>
        <div className="products_card">
          <img src={airFilter} alt="image" />
          <div className="products_card_content">
            <p className="price">
              399.999,99 <span>uzs</span>
            </p>
            <p className="products_name">Air Filter (SCT) 3000</p>

            <button>Add To Cart</button>
          </div>
        </div>
        
      </div>
    </div>
  );
};
