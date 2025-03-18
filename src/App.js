import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import ProductDetails from "./pages/ProductDetails";
import CompareProducts from "./pages/CompareProducts";
import "./styles/App.css";

const App = () => {
  const [compareList, setCompareList] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => setAllProducts(data.products || []))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const addProduct = (product) => {
    if (compareList.length < 4 && !compareList.some((item) => item.id === product.id)) {
      setCompareList([...compareList, product]);
    }
  };

  const removeProduct = (id) => {
    setCompareList(compareList.filter((product) => product.id !== id));
  };

  return (
    <Router>
      <Navbar />
      <Sidebar />
      <div className="main-content">
        <Routes>
          {/* Home Page should show Product Details */}
          <Route path="/" element={<ProductDetails compareList={compareList} setCompareList={setCompareList} />} />
          <Route
            path="/compare"
            element={<CompareProducts comparedProducts={compareList} removeProduct={removeProduct} allProducts={allProducts} addProduct={addProduct} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
