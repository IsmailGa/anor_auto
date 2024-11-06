import React, { useEffect, useState, useCallback, memo } from "react";
import axios from "axios";
import "./index.css";
import FilteredProducts from "./FilteredProducts"
import { NavLink, useNavigate, useParams } from "react-router-dom";


const AdminProducts = memo(function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:6060/api/products/")
      .then((res) => {
        setProducts(res.data);
        const uniqueCategories = [...new Set(res.data.map((item) => item.category))];
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error(err));
  }, []);



  return (
    <>
      <div className="category_links">
        {categories.map((cat) => (
          <NavLink
            key={cat}
            to={`/admin/category/${cat.toLowerCase()}`}
          >
            {cat}
          </NavLink>
        ))}
      </div>
      <FilteredProducts products={products} />
    </>
  );
});

export default AdminProducts;
