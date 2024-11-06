import React from "react";
import "./Review.css";
import { ArrowLeftW, ArrowRightB } from "../../../../components/Icons/Icons";
import { useLanguage } from "../../../LanguageContext";

export const Reviews = () => {
  const {lang} = useLanguage()

  return (
    <div className="reviews">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          width: "100%",
        }}
      >
        <h1
          style={
            lang === "ru" ? { fontFamily: "Onest" } : { fontFamily: "Archivo" }
          }
        >
          {lang === "en" ? "Reviews" : "Отзывы"}
        </h1>{" "}
        <div className="reviews_buttons">
          <button>
            <ArrowLeftW />
          </button>
          <button>
            <ArrowRightB />
          </button>
        </div>
      </div>

      <div className="reviews_cards">
        <div className="reviews_card">
          <p className="reviews_card_text">
            “Everything is good, especially this website. Designer knows what he
            does 🔥🔥”
          </p>
          <h5 className="reviews_card_author">Harry Potter</h5>
        </div>

        <div className="reviews_card">
          <p className="reviews_card_text">
            “Everything is good, especially this website. Designer knows what he
            does 🔥🔥”
          </p>
          <h5 className="reviews_card_author">Harry Potter</h5>
        </div>

        <div className="reviews_card">
          <p className="reviews_card_text">
            “Everything is good, especially this website. Designer knows what he
            does 🔥🔥”
          </p>
          <h5 className="reviews_card_author">Harry Potter</h5>
        </div>

        <div className="reviews_card">
          <p className="reviews_card_text">
            “Everything is good, especially this website. Designer knows what he
            does 🔥🔥”
          </p>
          <h5 className="reviews_card_author">Harry Potter</h5>
        </div>
      </div>
    </div>
  );
};
