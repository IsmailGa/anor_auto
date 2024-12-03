import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import "./adminLogin.css";

function AdminLogin({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 
    try {
      const response = await axios.post("http://localhost:6060/api/admins/login", {
        username,
        password,
      });
      const { token } = response.data;

      if (token) {
        setToken(token);
        navigate("/admin-d-8884/panel");
      } else {
        setError("Ошибка: токен не получен от сервера.");
      }
    } catch (err) {
      console.error(err.message);
      setError("Неверные учетные данные");
    }
  };

  return (
    <div className="admin_login">
      <div className="container">
        <div className="admin_content">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label className="custom-field one">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder=" "
                />
                <span className="placeholder">Имя пользователя</span>
              </label>
            </div>
            <div>
              <label className="custom-field one">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" "
                />
                <span className="placeholder">Пароль</span>
              </label>
            </div>
            {error && <p className="error_msg">{error}</p>}
            <button type="submit">Войти</button>
          </form>
          <NavLink to="/" style={{color: "#FFFFFF", paddingTop: "20px", fontFamily: "Onest", fontSize: "20px"}}>Обратно к главной странице</NavLink>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
