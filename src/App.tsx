import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import AllProductos from "./Pages/AllProductos";
import ProductDetail from "./Pages/ProductoDetails";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/productos" element={<AllProductos />} />
          <Route path="/productos/:productId" element={<ProductDetail />} />
          {/* Agrega más rutas aquí según sea necesario */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
