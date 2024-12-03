import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";

export default function FilteredProducts({ products }) {
  const { category } = useParams();
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate("/admin-d-8884/products/" + id);
  };

  const handleEdit = (product) => {
    navigate("/admin-d-8884/panel", { state: { product } });
  };

  // Filter products based on category URL parameter
  const filteredProducts = products.filter(
    (item) => category ? item.category.toLowerCase() === category.toLowerCase() : true
  );

  return (
    <div className="admin_products">
      <div className="products_cards">
        {filteredProducts.map((item, index) => (
          <div className="products_card" key={index}>
            <img src={item.image_url} alt={item.name_ru} onClick={() => handleClick(item.id)} />
            <div className="products_card_content">
              <h2>{item.name_ru}</h2>
              <p>{item.category}</p>
              <p>{item.size} cm</p>
              <p>{item.weight} kg</p>
              <p>Created at: {new Date(item.created_at).toLocaleDateString()}</p>
              <p>Updated at: {new Date(item.updated_at).toLocaleDateString()}</p>
            </div>
            <button onClick={() => handleClick(item.id)}>Перейти к продукту</button>
            <button onClick={() => handleEdit(item)}>Поменять</button>
          </div>
        ))}
      </div>
    </div>
  );
}
