import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import AdminLogin from "./AdminLogin";
import AdminPanel from "./AdminPanel";
import Dashboard from "./Dashboard/Dashboard";
import AdminProduct from "./Products/AdminProduct";
import AdminProducts from "./Products/AdminProducts";

export default function Admin({ api }) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [token, setToken] = useState(cookies.token || null);
  const [isValidToken, setIsValidToken] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await axios.post(api + "/admins/logout", {}, { withCredentials: true });
      removeCookie("token");
      setToken(null);
      setIsValidToken(false);
      window.location.href = "/admin-d-8884/login";
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const saveToken = (newToken) => {
    setToken(newToken);
    setCookie("token", newToken, { path: "/", maxAge: 2592000 });
  };

  const validateToken = async () => {
    try {
      if (token) {
        const response = await axios.post(
          api + "/admins/validate-token",
          { token },
          { withCredentials: true }
        );

        if (response.data.valid) {
          setIsValidToken(true);
        } else {
          handleLogout();
        }
      } else {
        setIsValidToken(false);
      }
    } catch (error) {
      console.error("Token validation failed", error);
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateToken();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin">
      {isValidToken && <Dashboard handleLogOut={handleLogout} />}
      <Routes>
        <Route
          path="panel"
          element={
            isValidToken ? (
              <AdminPanel api={api} token={token} />
            ) : (
              <Navigate to="/admin-d-8884/login" replace />
            )
          }
        />
        <Route
          path="login"
          element={
            isValidToken ? (
              <Navigate to="/admin-d-8884/panel" replace />
            ) : (
              <AdminLogin api={api} setToken={saveToken} />
            )
          }
        />
        <Route
          path="products"
          element={
            isValidToken ? <AdminProducts api={api} /> : <Navigate to="/404" replace />
          }
        />
        <Route
          path="category/:category"
          element={
            isValidToken ? <AdminProducts api={api} /> : <Navigate to="/404" replace />
          }
        />
        <Route
          path="products/:id"
          element={
            isValidToken ? <AdminProduct api={api} /> : <Navigate to="/404" replace />
          }
        />
      </Routes>
    </div>
  );
}
