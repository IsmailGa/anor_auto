import React from "react";
import "./Partners.css";
import camc from "../../../../assets/camc.png";
import { useLanguage } from "../../../LanguageContext";

export const Partners = () => {
  const { lang } = useLanguage();

  return (
    <div className="partners">
      <h1
        style={
          lang === "ru" ? { fontFamily: "Onest" } : { fontFamily: "Archivo" }
        }
      >
        {lang === "en" ? "Our Partners" : "Наши партнёры"}
      </h1>
      <div className="partners_brands">
        <img src={camc} alt="camc" width={128} />
      </div>
    </div>
  );
};
