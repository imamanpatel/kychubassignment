import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/">Product Details</Link></li>
        <li><Link to="/compare">Compare Products</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;