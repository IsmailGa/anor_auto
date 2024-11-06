import React from "react";
import "./index.css";
import { NavLink } from "react-router-dom";

export default function Dashboard({ handleLogOut }) {
  const adminLinks = [
    { href: "/admin/panel", label: "Панель" },
    { href: "/admin/products", label: "Продукты" },
  ];

  return (
    <div className="admin_dashaboard">
      <div className="container">
        <ul className="admin_links">
          {adminLinks.map((link, index) => (
            <li key={index}>
              <NavLink to={link.href}>{link.label}</NavLink>
            </li>
          ))}
        </ul>

        <button onClick={handleLogOut} className="admin_logout">
          Выйти
        </button>
      </div>
    </div>
  );
}
