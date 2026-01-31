import { Link } from "react-router-dom";
import axios from "axios";
import { validationSignup } from "../middlewares/signupValdidations";
import { useState } from "react";
import config from "../config";

const FormInput = ({ label, name, type, value, onChange, error }) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">
      <strong>{label}</strong>
    </label>
    <input
      id={name}
      name={name}
      type={type}
      className="form-control"
      placeholder={`Enter ${label}`}
      value={value}
      onChange={onChange}
    />
    {error && <span className="text-danger">{error}</span>}
  </div>
);

const Signup = ({ isAdmin }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    isAdmin: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formErrors = validationSignup(values);
    setErrors(formErrors);

    if (!Object.values(formErrors).every((err) => err === "")) {
      setLoading(false);
      return;
    }

    try {
      const apiUrl = config.API_BASE_URL;
      const response = await axios.post(`${apiUrl}/api/signup`, values);

      if (response.status === 201) {
        const { token, userId, isAdmin } = response.data;

        // ✅ SAME AS LOGIN
        localStorage.setItem("accessToken", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("isAdmin", isAdmin === '1');

        console.log("Signup + login success:", token, userId, isAdmin);

        window.location.href = "/";
      }
    } catch (error) {
      console.error(
        "Signup failed:",
        error.response?.data?.errorMessage || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center custom-background vh-100">
      <div className="first-left-accounts d-inline-block p-2 rounded" style={{ maxWidth: "400px", width: "100%", marginTop: "-78px" }}>
        <h3>Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <FormInput label="Email" name="email" type="email" value={values.email} onChange={handleInput} error={errors.email} />
          <FormInput label="User Name" name="name" type="text" value={values.name} onChange={handleInput} error={errors.name} />
          <FormInput label="Phone" name="phoneNumber" type="number" value={values.phoneNumber} onChange={handleInput} error={errors.phone} />
          <FormInput label="Password" name="password" type="password" value={values.password} onChange={handleInput} error={errors.password} />

          {isAdmin && (
            <div className="mb-3">
              <label className="form-label"><strong>Are you an admin?</strong></label>
              <input type="checkbox" className="form-check-input" name="isAdmin" onChange={handleInput} checked={values.isAdmin} />
            </div>
          )}

          <button type="submit" className="btn btn-success w-100" disabled={loading}>
            {loading ? "Signing up..." : "Create Account"}
          </button>

          <p className="text-center">You agree to our terms and conditions</p>
          <Link to="/login" className="btn btn-default w-100" style={{ backgroundColor: "#004170", color: "#fff" }}>
            Sign In
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
