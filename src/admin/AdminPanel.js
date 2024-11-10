import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config"; // Your Firebase configuration
import "./adminPanel.css";
import { Upload } from "../components/Icons/Icons";

function AdminPanel({ pr }) {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [errorDel, setErrorDel] = useState(false);
  const [error, setError] = useState("");
  const [state, setState] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: null,
    name_en: "",
    name_ru: "",
    category: "",
    part_number: "",
    price: "",
    status: true,
    image_url: null,
    size: "",
    weight: "",
    description_en: "There is no info about the product",
    description_ru: "Нет информации про данный товар",
    created_at: new Date(),
    updated_at: new Date(),
  });
  const [imageUrl, setImageUrl] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const navigate = useNavigate();
  const DEFAULT_IMAGE_URL =
    "https://firebasestorage.googleapis.com/v0/b/anor-auto.appspot.com/o/products%2FdefaultImage.png?alt=media&token=62ca506a-02b1-4716-83ac-55bec99f4b6f";

  useEffect(() => {
    axios
      .get("http://localhost:6060/api/products", config)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (location.state && location.state.product) {
      setNewProduct(location.state.product);
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    setErrorDel(false);
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `products/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");

        if (progress === 100) {
          setIsUploaded(true);
        }
      },
      (error) => {
        console.error("Error uploading image:", error);
        setError("Ошибка при загрузке изображения");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageUrl(url);
          setNewProduct({ ...newProduct, image_url: url });
        });
      }
    );
  };

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const finalImageUrl = newProduct.image_url || DEFAULT_IMAGE_URL;

      if (newImage) {
        const storageRef = ref(storage, `products/${newImage.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, newImage);
        finalImageUrl = await getDownloadURL(uploadTask.ref);
      }

      if (newProduct.id) {
        const response = await axios.put(
          `http://localhost:6060/api/products/${newProduct.id}`,
          { ...newProduct, image_url: finalImageUrl },
          config
        );
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === newProduct.id ? response.data : p))
        );
        setState("Продукт был изменён");
      } else {
        const response = await axios.post(
          "http://localhost:6060/api/products",
          { ...newProduct, image_url: finalImageUrl },
          config
        );
        setProducts((prevProducts) => [...prevProducts, response.data]);
        setState("Продукт был добавлен");
      }
      setNewProduct({
        id: null,
        name_en: "",
        name_ru: "",
        category: "",
        part_number: "",
        price: "",
        status: true,
        image_url: null,
        size: "",
        weight: "",
        description_en: "",
        description_ru: "",
      });
      setImageUrl("");
    } catch (error) {
      console.error(
        "Error adding or updating product:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      if (!id) {
        setErrorDel(true);
      }
      await axios.delete(`http://localhost:6060/api/products/${id}`, config);
      setProducts(products.filter((product) => product.id !== id));
      setNewProduct({
        id: null,
        name_en: "",
        name_ru: "",
        category: "",
        part_number: "",
        price: "",
        status: true,
        image_url: null,
        size: "",
        weight: "",
        description_en: "",
        description_ru: "",
      });
    } catch (error) {
      console.log("Deleting product ID:", id);
      console.error("Error deleting product:", error);
    }
  };

  const handleClear = () => {
    try {
      setNewProduct({
        id: null,
        name_en: "",
        name_ru: "",
        category: "",
        part_number: "",
        price: "",
        status: true,
        image_url: null,
        size: "",
        weight: "",
        description_en: "",
        description_ru: "",
      });
      setState("");
    } catch (error) {
      console.log("Error clearing inputs " + error);
    }
  };

  return (
    <div className="admin_panel">
      <div className="container">
        <h1>Админ Панель</h1>
        <div className="wrapper">
          <form onSubmit={handleAddOrUpdateProduct} className="admin_form">
            <label htmlFor="name_en">
              Наименование на Английском{" "}
              <input
                id="name_en"
                type="text"
                name="name_en"
                value={newProduct.name_en}
                onChange={handleInputChange}
                required
              />
            </label>

            <label htmlFor="name_en">
              Информация на Английском{" "}
              <input
                id="description_en"
                type="text"
                name="description_en"
                value={newProduct.description_en}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Наименование на Русском:{" "}
              <input
                type="text"
                name="name_ru"
                value={newProduct.name_ru}
                onChange={handleInputChange}
                required
              />
            </label>

            <label htmlFor="name_en">
              Информация на Русском{" "}
              <input
                id="description_ru"
                type="text"
                name="description_ru"
                value={newProduct.description_ru}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Категорию:
              <select
                name="category"
                className="admin_category"
                value={newProduct.category}
                onChange={handleInputChange}
                required
              >
                <option>Выберите Категорию</option>
                <option value="tires">Шины</option>
                <option value="oils">Масла</option>
                <option value="bearings">Подшипники</option>
                <option value="filters">Фильтры</option>
                <option value="battery">Аккмуляторы</option>
                <option value="others">Другое</option>
              </select>
            </label>

            <label>
              Цена Продукта:
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Номер Продукта:
              <input
                type="text"
                name="part_number"
                value={newProduct.part_number}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Размер:{" "}
              <input
                type="number"
                name="size"
                value={newProduct.size}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Вес:{" "}
              <input
                type="number"
                name="weight"
                value={newProduct.weight}
                onChange={handleInputChange}
              />
            </label>

            <label className="stock_check">
              {newProduct.status ? "В наличии" : "Не в наличии"}
              <input
                type="checkbox"
                name="in_stock"
                checked={newProduct.status}
                onChange={() =>
                  setNewProduct({ ...newProduct, status: !newProduct.status })
                }
              />
              <span className="checkmark"></span>
            </label>

            <div style={{ display: "flex", gap: "20px", width: "100%" }}>
              <label className="img_input">
                Загрузить Картину
                <input type="file" onChange={handleImageUpload} />
                <Upload className="upload_icon" />
              </label>
              {newProduct.image_url && (
                <NavLink to={newProduct.image_url}>
                  <img src={newProduct.image_url} alt="Uploaded" width="400" />
                </NavLink>
              )}
              <span
                style={
                  isUploaded
                    ? { opacity: "1", visibility: "visible" }
                    : { opacity: "0", visibility: "hidden" }
                }
              >
                Картина Загружена
              </span>
            </div>
            <div className="action_btns">
              <button type="submit" className="btn_add" disabled={loading}>
                {loading
                  ? "Сохраняем Продукт..."
                  : newProduct.id
                  ? "Обновить Продукт"
                  : "Добавить Продукт"}
              </button>
              <button
                style={
                  !newProduct.id ? { display: "none" } : { display: "block" }
                }
                type="submit"
                className="btn_add btn_delete"
                disabled={loading}
                onClick={() => handleDeleteProduct(newProduct.id)}
              >
                Удалить Продукт
              </button>
              <button
                className="btn_add btn_clear"
                disabled={loading}
                onClick={handleClear}
              >
                Очистить всё
              </button>
            </div>
            {errorDel && <div>Невозможно удалить несуществующий товар</div>}
          </form>
          {state && <div>{state}</div>}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
