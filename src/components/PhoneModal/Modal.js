import React from "react";
import { useState, useEffect } from "react";
import { useLanguage } from "../../pages/LanguageContext";
import "./Modal.css";

export default function Modal({ show, onClose }) {

  const {lang} = useLanguage()
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className={show ? "modal open" : "modal"}>
      <div className="modal_window">
        <div className="modal_info">
          <h1>ANOR AUTO</h1>
          <p
            style={
              lang === "ru"
                ? { fontFamily: "Onest" , fontSize: '20px'}
                : { fontFamily: "Archivo" }
            }
          >
            {lang === "en"
              ? "Reach to us through phone or social media. We'll respond to you as soon as we can"
              : "Свяжитесь с нами по телефону или в социальных сетях. Мы ответим вам, как только сможем"}
          </p>
        </div>
        <ul className="modal_links">
          <li>
            <a href="tel:+998983608884">+998 (98) 360-88-84</a>
          </li>
          <li>
            <a href="tel:+998977742929">+998 (97) 774-29-29</a>
          </li>
          <li>
            <a href="mailto:idealagroinvest@yandex.com">
              Email: idealagroinvest@yandex.com
            </a>
          </li>
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
