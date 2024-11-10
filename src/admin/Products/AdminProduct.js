import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AdminProduct() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [product, setProduct] = useState(null); // Initially null to show "Loading..."

  useEffect(() => {
    axios
      .get(`http://localhost:6060/api/products/${id}`)
      .then((res) => {
        console.log("API Response:", res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setProduct(null); 
      });
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{color: "#fff"}}>
      <div className="container">
        <button onClick={() => navigate("/admin/products")}>Назад к продуктам</button>
        <h1 style={{display: 'flex', gap: "10px"}}>
          {product.name_en} ({product.name_ru})
        </h1>
        <h1 style={{display: 'flex', gap: "10px"}}>
          = {product.description_en} ({product.description_ru}) =
        </h1>
        <p>Category: {product.category}</p>
        <p>Part Number: {product.part_number}</p>
        <p>Price: {product.price}</p>
        <p>Size: {product.size}</p>
        <p>Weight: {product.weight}</p>
        <p>{product.status ? "In Stock" : "Out of Stock"}</p>
        <img src={product.image_url} alt={product.name_en} width={500} />
      </div>
    </div>
  );
}

export default AdminProduct;
