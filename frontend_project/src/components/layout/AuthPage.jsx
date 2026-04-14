import { useState } from "react";
import "./AuthPage.css";

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!isSignIn && !formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isSignIn && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setIsSubmitted(true);
    }
  };

  const switchMode = () => {
    setIsSignIn(!isSignIn);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
    setIsSubmitted(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  if (isSubmitted) {
    return (
      <div className="account-container">
        <div className="account-card">
          <div className="success-box">
            <div className="success-icon">🎉</div>
            <h2 className="success-title">
              {isSignIn ? "Welcome Back!" : "Account Created!"}
            </h2>
            <p className="success-text">
              {isSignIn
                ? `Signed in as ${formData.email}`
                : `Welcome, ${formData.name}! Your account is ready.`}
            </p>
            <button className="account-back-btn" onClick={switchMode}>
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="account-container">
      <div className="account-card">

        <div className="account-header">
          <div className="account-logo">🔐</div>
          <h1 className="account-title">
            {isSignIn ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="account-subtitle">
            {isSignIn
              ? "Sign in to your account to continue"
              : "Sign up to get started today"}
          </p>
        </div>

        <div className="toggle-container">
          <button
            className={`toggle-btn ${isSignIn ? "active" : ""}`}
            onClick={() => { if (!isSignIn) switchMode(); }}
          >
            Sign In
          </button>
          <button
            className={`toggle-btn ${!isSignIn ? "active" : ""}`}
            onClick={() => { if (isSignIn) switchMode(); }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          {!isSignIn && (
            <div className="form-group">
              <label className="label">Full Name</label>
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input ${errors.name ? "input-error" : ""}`}
                />
              </div>
              {errors.name && (
                <p className="error-msg">⚠ {errors.name}</p>
              )}
            </div>
          )}

          <div className="form-group">
            <label className="label">Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon">✉️</span>
              <input
                type="text"
                name="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleChange}
                className={`input ${errors.email ? "input-error" : ""}`}
              />
            </div>
            {errors.email && (
              <p className="error-msg">⚠ {errors.email}</p>
            )}
          </div>

          <div className="form-group">
            <label className="label">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={`input ${errors.password ? "input-error" : ""}`}
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && (
              <p className="error-msg">⚠ {errors.password}</p>
            )}
            {isSignIn && (
              <div className="forgot-link">
                <span className="link">Forgot password?</span>
              </div>
            )}
          </div>

          {!isSignIn && (
            <div className="form-group">
              <label className="label">Confirm Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`input ${errors.confirmPassword ? "input-error" : ""}`}
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="error-msg">⚠ {errors.confirmPassword}</p>
              )}
            </div>
          )}

          <button type="submit" className="submit-btn">
            {isSignIn ? "Sign In →" : "Create Account →"}
          </button>
        </form>

        <div className="divider">
          <span className="divider-line"></span>
          <span className="divider-text">or continue with</span>
          <span className="divider-line"></span>
        </div>

        <div className="social-container">
          <button className="social-btn">
            <span>🌐</span> Google
          </button>
          <button className="social-btn">
            <span>🐙</span> GitHub
          </button>
          <button className="social-btn">
            <span>🐦</span> Twitter
          </button>
        </div>

        <p className="footer-text">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <span className="link" onClick={switchMode}>
            {isSignIn ? "Sign Up" : "Sign In"}
          </span>
        </p>

      </div>
    </div>
  );
};

export default AuthPage;