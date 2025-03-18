import React from "react";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src="logo.png" alt="Logo" className="logo" />
      <span>KYC Hub</span>
      <img src="user.png" alt="User Profile" className="profile" />
    </nav>
  );
};

export default Navbar;