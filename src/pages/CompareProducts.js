import React, { useState } from "react";
import "../styles/compareProducts.css";
import { Modal, Table, Button } from "antd";

const CompareProducts = ({ comparedProducts = [], removeProduct, allProducts = [], addProduct }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleAddMore = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    selectedProducts.forEach((product) => addProduct(product));
    setSelectedProducts([]);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedProducts(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: comparedProducts.some((p) => p.id === record.id) || selectedProducts.length >= 4,
    }),
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Price", dataIndex: "price", key: "price" },
  ];

  return (
    <div className="compare-container">
      <h2 className="compare-header">Compare Products</h2>
      <Button type="primary" className="add-more-btn" onClick={handleAddMore} disabled={comparedProducts.length >= 4}>
        Add More
      </Button>
      
      {comparedProducts.length > 0 ? (
        <div className="compare-table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                {comparedProducts.map((product) => (
                  <th key={product.id}>
                    <div className="product-header">
                      <img className="product-image" src={product.thumbnail} alt={product.title} />
                      <h4>{product.title}</h4>
                      <button className="remove-btn" onClick={() => removeProduct(product.id)}>Remove</button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Brand</strong></td>
                {comparedProducts.map((product) => <td key={product.id}>{product.brand}</td>)}
              </tr>
              <tr>
                <td><strong>Category</strong></td>
                {comparedProducts.map((product) => <td key={product.id}>{product.category}</td>)}
              </tr>
              <tr>
                <td><strong>Price</strong></td>
                {comparedProducts.map((product) => <td key={product.id}>${product.price}</td>)}
              </tr>
              <tr>
                <td><strong>Rating</strong></td>
                {comparedProducts.map((product) => <td key={product.id}>{product.rating}</td>)}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-products">No products selected for comparison</p>
      )}

      <Modal
        title="Add More Products"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="compare-modal"
      >
        <Table
          rowSelection={{ type: "checkbox", ...rowSelection }}
          columns={columns}
          dataSource={allProducts}
          rowKey="id"
        />
      </Modal>
    </div>
  );
};

export default CompareProducts;
