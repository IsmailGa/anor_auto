import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import "./Error.css";

export const Error = () => {
  const { lang } = useLanguage();

  return (
    <div className="error_page">
      <h1
        style={
          lang === "ru" ? { fontFamily: "Onest" } : { fontFamily: "Archivo" }
        }
      >
        {lang === "en" ? "Wrong Page - 404" : "Неправильная страница - 404"}
      </h1>
      <br />
      <h3>
        <Link
          style={
            lang === "ru" ? { fontFamily: "Onest" } : { fontFamily: "Archivo" }
          }
          to={"/"}
        >
          {lang === "en" ? "Back to Home page" : "Назад домой"}
        </Link>
      </h3>
    </div>
  );
};
