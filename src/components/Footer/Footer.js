import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { InstagramIcon, TelegramIcon, FacebookIcon } from "../Icons/Icons";
import { useLanguage } from "../../pages/LanguageContext";

export const Footer = () => {
  const { lang } = useLanguage();

  const navLinks = {
    en: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About us" },
      { href: "/products/all", label: "Shop" },
      { href: "/service", label: "Service" },
    ],
    ru: [
      { href: "/", label: "Домой" },
      { href: "/about", label: "О нас" },
      { href: "/products/all", label: "Магазин" },
      { href: "/service", label: "Сервис" },
    ],
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer_wrapper">
          <div className="footer_left">
            <h1 className="footer_title">ANOR AUTO</h1>
            <p
              className="footer_descr"
              style={
                lang === "ru"
                  ? { fontFamily: "Onest" }
                  : { fontFamily: "Archivo" }
              }
            >
              {lang === "en"
                ? "Our curated collection of auto parts and accessories to find the perfect components for your truck."
                : "Наша тщательно подобранная коллекция автозапчастей и аксессуаров поможет найти идеальные компоненты для вашего грузовика."}
            </p>
          </div>
          <div className="footer_right">
            <ul className="footer_links">
              {navLinks[lang].map(({ href, label }) => (
                <Link
                  key={href}
                  to={href}
                  style={
                    lang === "ru"
                      ? { fontFamily: "Onest" }
                      : { fontFamily: "Archivo" }
                  }
                >
                  {label}
                </Link>
              ))}
            </ul>
            <ul className="footer_icons">
              <li>
                <Link>
                  <TelegramIcon />
                </Link>
              </li>
              <li>
                <Link>
                  <FacebookIcon />
                </Link>
              </li>
              <li>
                <Link to="https://www.instagram.com/anor_auto/">
                  <InstagramIcon />
                </Link>
              </li>
            </ul>
            <div
              className="footer_copyright"
              style={
                lang === "ru"
                  ? { fontFamily: "Onest" }
                  : { fontFamily: "Archivo" }
              }
            >
              {lang === "en"
                ? "Copyright © 2024 Anor Auto. All rights reserved"
                : "Copyright © 2024 Анор Авто. Все права защищены"}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
