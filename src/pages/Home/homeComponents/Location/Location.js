import React from "react";
import { useLanguage } from "../../../LanguageContext";
import "./Location.css";

export const MapLocation = () => {
  const { lang } = useLanguage();

  return (
    <div className="location">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d187.52080743891037!2d69.2143966877239!3d41.236305508595095!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1730917636353!5m2!1sen!2s"
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
