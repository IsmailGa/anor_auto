import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import AdminLogin from "./AdminLogin";
import AdminPanel from "./AdminPanel";
import Dashboard from "./Dashboard/Dashboard";
import AdminProduct from "./Products/AdminProduct";
import AdminProducts from "./Products/AdminProducts";

export default function Admin({api}) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [token, setToken] = useState(cookies.token || null);

  const handleLogout = async () => {
    try {
      // Request to the backend to logout the user
      await axios.post(api + "/admins/logout", {}, { withCredentials: true });

      // Remove token from both cookies and state
      removeCookie("token");
      setToken(null);

      // Redirect to login page
      window.location.href = "/admin-d-8884/login";
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const saveToken = (newToken) => {
    setToken(newToken);
    setCookie("token", newToken, { path: "/", maxAge: 2592000 });
  };

  useEffect(() => {
    // Sync token from cookies when page is reloaded
    const savedToken = cookies.token;
    if (savedToken !== token) {
      setToken(savedToken);
    }
  }, [cookies, token]); // Dependency on cookies and token to track changes

  return (
    <div className="admin">
      {token && <Dashboard handleLogOut={handleLogout} />}
      <Routes>
        <Route
          path="panel"
          element={
            token ? (
              <AdminPanel api={api} token={token} />
            ) : (
              <Navigate to="/admin-d-8884/login" />
            )
          }
        />
        <Route
          path="login"
          element={
            token ? (
              <Navigate to="/admin-d-8884/panel" replace />
            ) : (
              <AdminLogin api={api} setToken={saveToken} />
            )
          }
        />
        <Route
          path="products"
          element={token ? <AdminProducts api={api} /> : <Navigate to="/404" replace />}
        />
        <Route
          path="category/:category"
          element={token ? <AdminProducts api={api} /> : <Navigate to="/404" replace />}
        />
        <Route
          path="products/:id"
          element={token ? <AdminProduct api={api} /> : <Navigate to="/404" replace />}
        />
      </Routes>
    </div>
  );
}
