import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { ArrowRight } from "../../../../components/Icons/Icons";
import "./Catalog.css";
import { useLanguage } from "../../../LanguageContext";

export const Catalog = () => {
  const [category, setCategory] = useState([]);
  const {lang} = useLanguage()


  useEffect(() => {
    axios
      .get("http://localhost:6060/api/products/")
      .then((res) => {
        const uniqueCategories = [...new Set(res.data.map((item) => item.category))]
        setCategory(uniqueCategories);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="catalog" >
      <div className="catalog_cards">
        <div className="catalog_card">
          <h3 style={lang==="ru" ? {fontFamily : "Onest"} : {fontFamily: "Archivo"}}>{lang==="en" ? "Truck Category": "Грузовые Категории"}</h3>
          <ul>
            {category.map((item) => (
              <>
              <li>
                <NavLink to={`/products/category/${item.toLowerCase()}`}>- {item.toUpperCase()}</NavLink>
              </li>
              </>
            ))}
          </ul>
          <NavLink className="catalog_button" to="/products" style={lang==="ru" ? {fontFamily : "Onest"} : {fontFamily: "Archivo"}}>
            {lang === "en" ? "View all" : "Посмотреть все"} <ArrowRight />{" "} 
          </NavLink>
        </div>
      </div>
    </div>
  );
};
