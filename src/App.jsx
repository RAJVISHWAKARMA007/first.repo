import React, { useState } from "react";
import "./App.css";
import Home from "./home/Home";


const CustomInput = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  togglePassword,
  isPasswordVisible,
}) => (
  <div className="form-group">
    <input
      type={isPasswordVisible && type === "password" ? "text" : type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      required
      autoComplete="off"
      className="input-field"
      placeholder=" "
    />
    <label htmlFor={name} className="floating-label">
      {label}
    </label>
    {togglePassword && (
      <span
        className="password-toggle"
        onClick={togglePassword}
        aria-label="Toggle password visibility"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") togglePassword();
        }}
      >
        {isPasswordVisible ? "Hide" : "Show"}
      </span>
    )}
  </div>
);

function App() {
  const [formData, setFormData] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is invalid";
    if (!formData.password) tempErrors.password = "Password is required";
    else if (formData.password.length < 6)
      tempErrors.password = "Password should be at least 6 characters";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert(`Logged in with Email: ${formData.email}\nRemember Me: ${formData.remember}`);
      }, 1500);
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <>
    <Home/>
      <div className="app-container">
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <h2>Login</h2>
          <CustomInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <CustomInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            togglePassword={togglePassword}
            isPasswordVisible={showPassword}
            placeholder="Enter your password"
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <div className="options-container">
            <label className="remember-me">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              Remember Me
            </label>

            <a href="#!" className="forgot-password">
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? <span className="loader"></span> : "Sign In"}
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
