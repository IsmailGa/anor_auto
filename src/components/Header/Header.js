import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { SearchIcon } from "../Icons/Icons";
import "./Header.css";
import { useLanguage } from "../../pages/LanguageContext";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, setLang } = useLanguage();

  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [menuState, setMenuState] = useState({
    isOpenMenu: false,
    isOpenSearch: false,
  });

  const navLinks = useMemo(
    () => ({
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
    }),
    []
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:6060/api/products");
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };
    fetchProducts();
  }, []);
  const filteredProducts = useMemo(() => {
    const lowerInput = searchInput.toLowerCase();
    return products.filter(
      (product) =>
        lowerInput &&
        (product.name_en.toLowerCase().includes(lowerInput) ||
          product.name_ru.toLowerCase().includes(lowerInput))
    );
  }, [searchInput, products]);

  const toggleMenu = () => {
    setMenuState((prevState) => ({
      isOpenMenu: !prevState.isOpenMenu,
      isOpenSearch: false,
    }));
  };

  const toggleSearch = () => {
    setMenuState((prevState) => ({
      isOpenSearch: !prevState.isOpenSearch,
      isOpenMenu: false,
    }));
  };

  const clearSearch = () => {
    setSearchInput("");
    setMenuState((prevState) => ({ ...prevState, isOpenSearch: false }));
  };

  const handleNavigate = (path) => {
    setMenuState({ isOpenMenu: false, isOpenSearch: false });
    navigate(path);
  };

  return (
    <header className="header">
      <div className="container">
        <nav>
          <div
            className={`burger_menu ${menuState.isOpenMenu ? "open" : ""}`}
            onClick={toggleMenu}
          >
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>

          <div className={`nav_links ${menuState.isOpenMenu ? "open" : ""}`}>
            {navLinks[lang].map(({ href, label }) => (
              <div
                key={href}
                className={`nav_link ${
                  location.pathname === href ? "active" : ""
                }`}
                style={{ fontFamily: lang === "ru" ? "Onest" : "Archivo" }}
                onClick={() => handleNavigate(href)}
              >
                {label}
              </div>
            ))}
            <div className="lang_switchers">
              <button onClick={() => setLang("ru")}>Ru</button>
              <button onClick={() => setLang("en")}>En</button>
            </div>
          </div>

          <Link
            to="/"
            className={`nav_title ${
              menuState.isOpenMenu || menuState.isOpenSearch ? "" : "open"
            }`}
          >
            Anor Auto
          </Link>

          <div className="search">
            <form
              className={`search_bar ${
                menuState.isOpenSearch ? "open_search" : ""
              }`}
            >
              <input
                id="search"
                type="search"
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onBlur={() => setTimeout(clearSearch, 100)}
              />
            </form>
            <div className="search_icon" onClick={() => toggleSearch()}>
              <SearchIcon />
            </div>
          </div>

          {menuState.isOpenSearch && searchInput && (
            <ul className="search_results">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(({ id, image_url, name_en }) => (
                  <li
                    className="search_result"
                    key={id}
                    onClick={() => {
                      handleNavigate(`/product/${id}`);
                    }}
                  >
                    <img src={image_url} alt={name_en} />
                    <h6>{name_en}</h6>
                  </li>
                ))
              ) : (
                <li className="no_products">
                  {lang === "en" ? "No products found" : "Нет таких продуктов"}
                </li>
              )}
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};
