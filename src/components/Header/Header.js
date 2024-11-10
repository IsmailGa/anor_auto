import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { SearchIcon } from "../Icons/Icons";
import "./Header.css";
import { useLanguage } from "../../pages/LanguageContext";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, setLang } = useLanguage();

  const [products, setProducts] = useState([]);
  const [input, setInput] = useState("");
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:6060/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    document.body.style.overflow = input ? "hidden" : "visible";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [input]);
  

  const filteredData = products.filter((product) => {
    const lowerInput = input.toLowerCase();
    return (
      lowerInput &&
      (product.name_en.toLowerCase().includes(lowerInput) ||
        product.name_ru.toLowerCase().includes(lowerInput))
    );
  });

  const toggleSearch = () => setIsOpenSearch(!isOpenSearch);

  const clearSearchInput = () => {
    setIsOpenSearch(false);
    setInput("");
  };

  const handleClickById = (id) => {
    setIsOpenSearch(!isOpenSearch);
    setInput("");
    navigate("/product/" + id);
  };

  return (
    <header className="header">
      <div className="container">
        <nav>
          <div className="burger_menu">
            <RxHamburgerMenu
              className="header_icon burger_icon"
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>

          <div className={isOpen ? "nav_links open" : "nav_links"}>
            <div className="close_icon" onClick={() => setIsOpen(!isOpen)}>
            <AiOutlineClose />
            </div>

            {navLinks[lang].map(({ href, label }) => (
              <Link
                key={href}
                className={`nav_link ${
                  location.pathname === href ? "active" : ""
                }`}
                style={
                  lang === "ru"
                    ? { fontFamily: "Onest" }
                    : { fontFamily: "Archivo" }
                }
                onClick={() => { 
                  setIsOpen(false);
                  navigate(href); 
                }}
              >
                {label}
              </Link>
            ))}

            <div className="lang_switchers">
              <button onClick={() => setLang("ru")}>Ru</button>
              <button onClick={() => setLang("en")}>En</button>
            </div>
          </div>

          <Link
            to="/"
            className={isOpen || isOpenSearch ? "nav_title" : "nav_title open"}
          >
            Anor Auto
          </Link>

          <div className="search">
            <form className={`search_bar ${isOpenSearch ? "open_search" : ""}`}>
              <input
                id="search"
                type="search"
                placeholder="Search products..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onBlur={() => setTimeout(clearSearchInput, 100)}
              />
            </form>

            <div className="search_icon" onClick={toggleSearch}>
              <SearchIcon />
            </div>
          </div>

          {isOpenSearch && input && (
            <ul className="search_results">
              {filteredData.length > 0 ? (
                filteredData.map(({ id, image_url, name_en }) => (
                  <li
                    className="search_result"
                    key={id}
                    onClick={() => handleClickById(id)}
                  >
                    <img src={image_url} alt={name_en} />
                    <h6>{name_en}</h6>
                  </li>
                ))
              ) : (
                <li className="no_products">No products found</li>
              )}
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};
