import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import "../styles/productDetails.css";

const ProductDetails = ({ compareList, setCompareList }) => {
  const [products, setProducts] = useState([]);

  // Fetch products when the component mounts
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data.products || [])) // Ensure products exist
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Function to add a product to the compare list
  const handleCompare = (product) => {
    if (compareList.length < 4 && !compareList.some((item) => item.id === product.id)) {
      setCompareList([...compareList, product]);
    }
  };

  // Define table columns
  const columns = [
    {
      title: "Image",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (text) => <img src={text} alt="Product" className="product-image" />, // Display product image
    },
    { title: "Name", dataIndex: "title", key: "title" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Price", dataIndex: "price", key: "price", render: (price) => `$${price}` },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => handleCompare(record)} disabled={compareList.some((item) => item.id === record.id)}>
          Compare
        </Button>
      ),
    },
  ];

  return (
    <div className="product-details-container">
      <h2>Product List</h2>
      <Table dataSource={products} columns={columns} pagination={{ pageSize: 5 }} rowKey="id" />

      {/* Navigate to Compare Page */}
      <Link to="/compare">
        <Button disabled={compareList.length === 0}>Go to Compare</Button>
      </Link>
    </div>
  );
};

export default ProductDetails;
