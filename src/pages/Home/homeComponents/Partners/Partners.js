import React from "react";
import "./Partners.css";
import camc from "../../../../assets/camc.png";
import daf from "../../../../assets/daf.png";
import foton from "../../../../assets/foton.png";
import howo from "../../../../assets/howo.png";
import kamaz from "../../../../assets/kamaz.png";
import man from "../../../../assets/man.png";
import maz from "../../../../assets/maz.png";
import shacman from "../../../../assets/shacman.png";
import shantui from "../../../../assets/shantui.png";
import xcmg from "../../../../assets/xcmg.png";
import zoomlion from "../../../../assets/zoomlion.png";
import { useLanguage } from "../../../LanguageContext";

export const Partners = () => {
  const { lang } = useLanguage();

  const ourPartners = [
    camc,
    daf,
    foton,
    howo,
    kamaz,
    man,
    maz,
    shacman,
    shantui,
    xcmg,
    zoomlion,
  ];

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
        {ourPartners.map((item) => (
          <img src={item} alt="camc"  />
        ))}
      </div>
    </div>
  );
};
