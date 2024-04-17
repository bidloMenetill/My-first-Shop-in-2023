import React from "react";
import Header from "./Components/Header/Header";
import Products from "./Components/Products/Products";
import { Route, Routes } from "react-router-dom";
import AddProducts from "./Components/AddProducts/AddProducts";
import "./App.css";
const App: React.FC = () => {
  return (
    <div>
      <div className="body_container">
        <div className="nav_container">
          <Header />
        </div>
        <main>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/add" element={<AddProducts />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
