import React from "react";
import { useLanguage } from "../LanguageContext";
import "./Service.css";

export const Service = () => {
  const { lang } = useLanguage();

  return (
    <div className="service">
      <div className="container">
        <h1
          style={
            lang === "ru" ? { fontFamily: "Onest" } : { fontFamily: "Archivo" }
          }
        >
          {lang === "en" ? "Auto Service" : "Авто Сервис"}
        </h1>
        <div className="autoservice_contacts">
          <p
            style={
              lang === "ru"
                ? { fontFamily: "Onest" }
                : { fontFamily: "Archivo" }
            }
          >
            {lang === "en"
              ? "Service contact info "
              : "Контактная информация сервиса"}
          </p>
          <ul>
            <li>
              <a href="tel:+998998206464">+998 (99) 820-64-64</a>
            </li>
            <li>
              <a href="tel:+9983391500824">+998 (33) 915-00-82</a>
            </li>
            <li>
              <a href="mailto:anor_auto_servis@mail.ru">
                Email : anor_auto_servis@mail.ru
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
