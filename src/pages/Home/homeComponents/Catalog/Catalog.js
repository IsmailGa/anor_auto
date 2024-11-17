import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { ArrowRight } from "../../../../components/Icons/Icons";
import "./Catalog.css";
import { useLanguage } from "../../../LanguageContext";

export const Catalog = () => {
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
    <div className="catalog">
      <div className="catalog_cards">
        <div className="catalog_card">
          <h3
            style={
              lang === "ru"
                ? { fontFamily: "Onest" }
                : { fontFamily: "Archivo" }
            }
          >
            {lang === "en" ? "Truck Category" : "Грузовые Категории"}
          </h3>
          <ul>
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
                    - {lang == "en" ? en : ru}
                  </NavLink>
                </li>
              </>
            ))}
          </ul>
          <NavLink
            className="catalog_button"
            to="/products"
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
