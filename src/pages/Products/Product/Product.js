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
  const [product, setProduct] = useState(null);
  const { lang } = useLanguage();
  const titleStyle = { fontFamily: lang === "ru" ? "Onest" : "Archivo" };

  useEffect(() => {
    axios
      .get(`http://localhost:6060/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.error("Error fetching product:", err);
        setProduct(null);
      });
  }, [id]);

  if (!product) {
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );
  }

  const productName = lang === "en" ? product.name_en : product.name_ru;
  const productDescription = lang === "en" ? product.description_en : product.description_ru;
  const statusText = lang === "en"
    ? product.status ? "In Stock" : "Out of Stock"
    : product.status ? "В наличии" : "Не в наличии";

  return (
    <div className="product">
      <Modal show={isShow} onClose={() => setIsShow(false)} />
      <div className="container">
        <button onClick={() => navigate("/products")} style={titleStyle}>
          <ArrowLeftW /> {lang === "en" ? "Go back" : "Назад"}
        </button>
        <div className="product_content">
          <img src={product.image_url} alt="product" />
          <div className="product_info">
            <h1 style={titleStyle}>{productName}</h1>
            <div className={product.status ? "status" : "status non-status"} style={titleStyle}>
              {statusText}
            </div>
            <p style={titleStyle}>{productDescription}</p>
          </div>
          <div className="product_price">
            <p>{product.price} UZS</p>
            <button onClick={() => setIsShow(true)} style={titleStyle}>
              {lang === "en" ? "Reach to us" : "Свяжитесь с нами"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
