import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { ArrowRight } from "../../../../components/Icons/Icons";
import "./Catalog.css";
import { useLanguage } from "../../../LanguageContext";

export const Catalog = ({setOpenCategory}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang } = useLanguage();

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

  return (
    <div className="home_category">
      <div className="home_category_cards">
        <div className="home_category_card">
          <h3
            style={
              lang === "ru"
                ? { fontFamily: "Onest" }
                : { fontFamily: "Archivo" }
            }
          >
            {lang === "en" ? "Truck Category" : "Категория грузовиков"}
          </h3>
          <div className="home_category_action">
            <button
            className={isOpen ? "h_c_btn active" : "h_c_btn"}
              onClick={() => setIsOpen(!isOpen)}
              style={
                lang === "ru"
                  ? { fontFamily: "Onest" }
                  : { fontFamily: "Archivo" }
              }
            >
              {lang == "en" ? "Toggle all categories" : "Открыть все категории"}
            </button>
            <ul className={isOpen ? "category_links open" : "category_links"}>
              {categories.map(({ key, en, ru }) => (
                <>
                  <li>
                    <NavLink
                      to={`/products/category/${key}`}
                      style={
                        lang === "ru"
                          ? { fontFamily: "Onest" }
                          : { fontFamily: "Archivo" }
                      }
                    >
                      {lang == "en" ? en : ru}
                    </NavLink>
                  </li>
                </>
              ))}
            </ul>
          </div>

          <NavLink
            className="home_category_button"
            to="/products"
            onClick={() => setOpenCategory(true)}
            style={
              lang === "ru"
                ? { fontFamily: "Onest" }
                : { fontFamily: "Archivo" }
            }
          >
            {lang === "en" ? "View all" : "Посмотреть все"} <ArrowRight />{" "}
          </NavLink>
        </div>
      </div>
    </div>
  );
};
