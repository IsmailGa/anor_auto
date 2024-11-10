import React from "react";
import { Main } from "./homeComponents/Main/Main";
import { Catalog } from "./homeComponents/Catalog/Catalog";
import { PopularProducts } from "./homeComponents/PopularProducts/PopularProducts";
import { Partners } from "./homeComponents/Partners/Partners";
import { SeasonProducts } from "./homeComponents/SeasonSales/SeasonProducts";
import { Reviews } from "./homeComponents/Review/Review";
import { MapLocation } from "./homeComponents/Location/Location";
import { useLanguage } from "../LanguageContext";


export const Home = () => {
  const {lang} = useLanguage()

  return (
    <section className="home" >
      <div className="container">
        <Main />
        <Catalog />
        <PopularProducts />
        <SeasonProducts />
        <Partners />
        {/* <Reviews /> */}
        <MapLocation />
      </div>
    </section>
  );
};
