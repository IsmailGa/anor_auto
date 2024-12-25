import React from "react";
import { useLanguage } from "../LanguageContext";
import "./About.css";

export const About = () => {
  const {lang} = useLanguage();

  const aboutInfo = {
    ru: {
      title: "О нас",
      customer: "Уважаемый Покупатель",
      organization: "Наша организация занимается оптовой торговлей",
      techParts: "Запчастями для грузовых автомобилей и спецтехники",
      descr: " В наличии имеется широкий ассортимент запасных частей, комплектующих, аксессуаров и расходных матермалов. Поставляемые нами изделия оригинальная продукция производителя. Наши товары отичаются высоким качествоми соответствуют требованиям мировых стандартов. Обладая огромным опытом в сфере поставок и продаж запасных частей на рынке узбекистана наши консультанты будут рады помочь Вам приобрести необходимые детали по наиболее низким ценам. В любое удобное для Вас время, мы готовы ответить на все имеющиеся вопросы и оперативно удовлетворить Вашу заявку."
    },
    en: {
      title: "About Us",
      customer: "Dear Customer",
      organization: "Our organization specializes in wholesale trade",
      techParts: "Spare parts for trucks and special equipment",
      descr: "We offer a wide range of spare parts, components, accessories, and consumables. The products we supply are original manufacturer items. Our goods are of high quality and meet global standards. With extensive experience in the supply and sale of spare parts in the Uzbek market, our consultants will be happy to help you acquire the necessary parts at the most competitive prices. At any time convenient for you, we are ready to answer all your questions and promptly fulfill your requests."
    }
  };

  return (
    <div className="about" id="about">
      <div className="container">
        <h1>{lang === "en" ? aboutInfo.en.title : aboutInfo.ru.title}</h1>
        <div className="about_intro">
          <h2>{lang === "en" ? aboutInfo.en.customer : aboutInfo.ru.customer}</h2>
          <p>{lang === "en" ? aboutInfo.en.organization : aboutInfo.ru.organization}</p>
          <h3>{lang === "en" ? aboutInfo.en.techParts : aboutInfo.ru.techParts}</h3>
        </div>
        <div className="about_info">
          <p>
          {lang === "en" ? aboutInfo.en.descr : aboutInfo.ru.descr}
          </p>
        </div>
      </div>
    </div>
  );
};
