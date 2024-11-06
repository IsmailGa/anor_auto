import React from "react";
import { NavLink } from "react-router-dom";
import "./Main.css";
import { ArrowRight } from "../../../../components/Icons/Icons";
import { ArrowOutward } from "../../../../components/Icons/Icons";
import { useLanguage } from "../../../LanguageContext";

export const Main = () => {
  const { lang } = useLanguage();

  const serviceLinks = [
    {
      href: "/service",
      label:
        lang === "en"
          ? "Heavy-Duty Repair Parts"
          : "Запчасти для капитального ремонта",
    },
    {
      href: "/service",
      label:
        lang === "en"
          ? "Truck Body Components"
          : "Кузовные детали для грузовиков",
    },
    {
      href: "/service",
      label:
        lang === "en"
          ? "Tires & Rims for Trucks"
          : "Шины и диски для грузовиков",
    },
  ];

  return (
    <div className="main">
      <div className="main_cards">
        <div className="main_card">
          <h1
            className="main_card_title"
            style={
              lang === "ru"
                ? { fontFamily: "Onest" }
                : { fontFamily: "Archivo" }
            }
          >
            {lang === "en"
              ? "Maintain Your Truck with Premium Quality Parts"
              : "Обслуживайте свой грузовик с качественными запчастями"}
          </h1>
          <h2
            className="main_card_subtitle"
            style={
              lang === "ru"
                ? { fontFamily: "Onest" }
                : { fontFamily: "Archivo" }
            }
          >
            {lang === "en"
              ? "For long hauls and heavy loads, your truck deserves specialized, durable parts and expert care."
              : "Для дальних поездок и тяжелых нагрузок ваш грузовик нуждается в специализированных, долговечных запчастях и профессиональном обслуживании."}
          </h2>
          <NavLink
            className="main_button"
            to="/products"
            style={
              lang === "ru"
                ? { fontFamily: "Onest" }
                : { fontFamily: "Archivo" }
            }
          >
            {lang === "en"
              ? "Browse Truck Parts"
              : "Посмотреть запчасти для грузовиков"}{" "}
            <ArrowRight />
          </NavLink>
        </div>
        <div className="main_card main_card-sec">
          <ul className="main_card_links">
            {serviceLinks.map((item) => (
              <li className="main_card_link" key={item.label}>
                <NavLink
                  to={item.href}
                  style={
                    lang === "ru"
                      ? { fontFamily: "Onest" }
                      : { fontFamily: "Archivo" }
                  }
                >
                  {item.label}
                  <ArrowOutward />
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
