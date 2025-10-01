import React from "react";
import "./Navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-logo">MyApp</div>
    <ul className="navbar-links">
      <li>
        <a href="#home" tabIndex={0}>
          Home
        </a>
      </li>
      <li>
        <a href="#features" tabIndex={0}>
          Features
        </a>
      </li>
      <li>
        <a href="#about" tabIndex={0}>
          About
        </a>
      </li>
      <li>
        <a href="#contact" tabIndex={0}>
          Contact
        </a>
      </li>
    </ul>
  </nav>
);

export default Navbar;
