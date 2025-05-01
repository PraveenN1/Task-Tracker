import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { useNavigate } from "react-router";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData,
        { withCredentials: true }
      );
      console.log("Login successful", response.data);
      navigate("/");
    } catch (err) {
      console.error("Login failed!", err);
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md max-w-sm w-full"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Login to Task Tracker</h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="text-xs text-blue-500"
        >
          {showPassword ? "Hide" : "Show"} password
        </button>

        <div className="flex my-2">
         Don&apos;t have an account? 
         
          <Link to="/auth/signup" className=""> <p className="text-blue-600 font-semibold ml-2 border-b-2  border-blue-600">Create Account </p></Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {loading ? "Logging in..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

// ✅ Reusable Input component
const Input = ({ label, name, type, value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-1 text-sm font-medium">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        required
      />
    </div>
  );
};

export default Login;