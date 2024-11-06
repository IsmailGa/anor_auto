import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Product.css";
import { ArrowLeftW } from "../../../components/Icons/Icons";
import Modal from "../../../components/PhoneModal/Modal";
import { useLanguage } from "../../LanguageContext";

function Product() {
  const [isShow, setIsShow] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null); // Initially null to show "Loading..."
  const { lang } = useLanguage();

  useEffect(() => {
    axios
      .get(`http://localhost:6060/api/products/${id}`)
      .then((res) => {
        console.log("API Response:", res.data); // Log response data to check format
        setProduct(res.data); // Assuming res.data is the product object
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setProduct(null); // Handle error by setting product to null
      });
  }, [id]);

  // Render "Loading..." while product data is being fetched
  if (!product) {
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="product">
      <Modal show={isShow} onClose={() => setIsShow(false)} />
      <div className="container">
        <button
          onClick={() => navigate("/products")}
          style={
            lang === "ru" ? { fontFamily: "Onest" } : { fontFamily: "Archivo" }
          }
        >
          <ArrowLeftW /> {lang === "en" ? "Go back" : "Назад"}
        </button>
        <div className="product_content">
          <img src={product.image_url} alt="pic" />
          <div className="product_info">
            <h1>{product.name_en}</h1>
            <p>{product.description_en}</p>
          </div>
          <div className="product_price">
            <p>{product.price} UZS</p>
            <button
              onClick={() => setIsShow(true)}
              style={
                lang === "ru"
                  ? { fontFamily: "Onest" }
                  : { fontFamily: "Archivo" }
              }
            >
              {lang === "en" ? "Reach to us" : "Свяжитесь с нами"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
