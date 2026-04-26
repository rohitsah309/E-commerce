import { useState } from "react";
import "./SignPage.css";
import { FaXTwitter, FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";


const SignPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  if (isSubmitted) {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000); 

    return () => clearTimeout(timer);
  }
  }, [isSubmitted, navigate]);


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

    if (!isSignIn && !formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }else if (!isSignIn && !/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if(!isSignIn && !formData.gender) {
      newErrors.gender = "Select gender";
    }

    if (!isSignIn && !formData.dob) {
      newErrors.dob = "Date of birth is required";
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


const getUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || [];
};

const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};


const handleSubmit = (e) => {
  e.preventDefault();

  const validationErrors = validate();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  const users = getUsers();

  if (isSignIn) {
    const user = users.find(
      (u) =>
        u.email === formData.email &&
        u.password === formData.password
    );

    if (!user) {
      setErrors({ email: "Invalid email or password" });
      toast.error("Invalid email or password");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("authChange", Date.now());
    window.dispatchEvent(new Event("authChanged"));

    toast.success("Login successful!");
    setIsSubmitted(true);
    
  } else {
    const userExists = users.find(
      (u) => u.email === formData.email
    );

    if (userExists) {
      setErrors({ email: "User already exists" });
      toast.error("User already exists");
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
      dob: formData.dob,
      password: formData.password,
    };

    users.push(newUser);
    saveUsers(users);

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    localStorage.setItem("authChange", Date.now());
    window.dispatchEvent(new Event("authChanged"));

    toast.success("Account created!");
    setIsSubmitted(true);
  }
};

const switchMode = () => {
  setIsSignIn(!isSignIn);
  setFormData({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
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
            <button
              className="account-back-btn"
              onClick= {() => navigate("/")}
            >
              Continue →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
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
              <>
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
              <div className="form-group">
                <label className="label">Phone No</label>
                <div className="input-wrapper">
                  <span className="input-icon">📞</span>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`input ${errors.phone ? "input-error" : ""}`}
                  />
                </div>
                {errors.phone && (
                  <p className="error-msg">⚠ {errors.phone}</p>
                )}
              </div>


              <div className="dob-row">
                <div className="form-group">
                  <label className="label">Gender</label>
                  <div className="input-wrapper">
                    <span className="input-icon">👤</span>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`input ${errors.gender ? "input-error" : ""}`}
                    >
                      <option value= "">Select</option>
                      <option value= "Male">Male</option>
                      <option value= "Female">Female</option>
                      <option value= "Trans">Trans</option>
                    </select>
                  </div>
                  {errors.gender && <p className="error-msg">⚠ {errors.gender}</p>}
                </div>
                <div className="form-group">
                  <label className="label">Date of Birth</label>
                  <div className="input-wrapper">
                    <span className="input-icon">📅</span>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className= {`input ${errors.dob ? "input-error" : ""}`}
                    />
                  </div>
                  {errors.dob && <p className="error-msg">⚠ {errors.dob}</p>}
                </div>
              </div>
              
              </>
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
              <FcGoogle /> Google
            </button>
            <button className="social-btn">
              <FaFacebook /> Facebook
            </button>
            <button className="social-btn">
              <FaXTwitter /> X
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
    </>
  );
};

export default SignPage;