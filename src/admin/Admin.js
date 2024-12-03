import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import AdminLogin from "./AdminLogin";
import AdminPanel from "./AdminPanel";
import Dashboard from "./Dashboard/Dashboard";
import AdminProduct from "./Products/AdminProduct";
import AdminProducts from "./Products/AdminProducts";

export default function Admin() {
  const [token, setToken] = useState(Cookies.get("token") || null);

  const handleLogout = () => {
    setToken(null);
    Cookies.remove("token"); 
  };

  const saveToken = (newToken) => {
    setToken(newToken);
    Cookies.set("token", newToken, { expires: 30 });
  };

  useEffect(() => {
    if (token) {
      Cookies.set("token", token, { expires: 30 });
    }
  }, [token]);

  return (
    <div className="admin">
      {token && <Dashboard handleLogOut={handleLogout} />}
      <Routes>
        <Route
          path="panel"
          element={token ? <AdminPanel token={token} /> : <Navigate to="/admin-d-8884/login" />}
        />
        <Route
          path="login"
          element={
            token ? (
              <Navigate to="/admin-d-8884/panel" replace />
            ) : (
              <AdminLogin setToken={saveToken} />
            )
          }
        />
        <Route
          path="products"
          element={token ? <AdminProducts /> : <Navigate to="/404" replace />}
        />
        <Route
          path="category/:category"
          element={token ? <AdminProducts /> : <Navigate to="/404" replace />}
        />
        <Route
          path="products/:id"
          element={token ? <AdminProduct /> : <Navigate to="/404" replace />}
        />
      </Routes>
    </div>
  );
}
