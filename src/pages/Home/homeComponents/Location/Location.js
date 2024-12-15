import React from "react";
import { useLanguage } from "../../../LanguageContext";
import "./Location.css";

export const MapLocation = () => {
  const { lang } = useLanguage();

  return (
    <div className="location">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d750.0824254327558!2d69.2144793!3d41.2363756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae6100218aa5e1%3A0x7d0c0fa0d4ef399e!2sAnor%20Auto!5e0!3m2!1sen!2s!4v1734173078136!5m2!1sen!2s"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      <a
        href="https://maps.app.goo.gl/Ug6wp4VEt9BSYrdXA"
        style={
          lang === "ru" ? { fontFamily: "Onest" } : { fontFamily: "Archivo" }
        }
      >
        {lang === "en" ? "Click" : "Нажать"} {"->"} 66P7+GRM 9 уй, Янги Сегели
        кучаси, 100012, Tashkent, Uzbekistan
      </a>
    </div>
  );
};
