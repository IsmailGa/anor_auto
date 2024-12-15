// App.js
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Preloader from "./components/Pre/Pre";
import ScrollToTop from "./components/ScrollToTop";
import Admin from "./admin/Admin";
import LanguageLayout from "./pages/LanguageLayout/LanguageLayout";
import { useLanguage } from "./pages/LanguageContext";
import {Error} from "./pages/404/Error";

function App() {
  const api = "http://localhost:5050/api"
  const location = useLocation();
  const {lang} = useLanguage();
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [lang]);

  useEffect(()=>{
    updateLoad(true);
  },[lang])

  return (
    <>
      <Preloader load={load} />
      <ScrollToTop />
      {/* {!isAdminRoute && <Header />} */}
      <Routes>
        <Route path="admin-d-8884/*" element={<Admin api={api}/>}/>
        <Route path="admin-d-8884" element={<Navigate to="/admin-d-8884/panel" replace/>}/>
        {/* {/* <Route path="service" element={<Service />} />
        <Route path="product/:id" element={<Product />}/>
        <Route exact path="/" element={<Home />} />
        <Route path="products/*" element={<Products />} /> */}
        <Route path="404" element={<Error />} />
        <Route path="/*" element={<LanguageLayout api={api}/>}/>
        {/* <Route path="*" element={<Navigate to="/404" replace />} /> */}
      </Routes>
      {/* {!isAdminRoute && <Footer />} */}
    </>
  );
}

export default App;
