import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Select from "react-select";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

const countryNames = countries.getNames("en", { select: "official" });

const countryOptions = Object.entries(countryNames).map(([code, name]) => ({
  value: code,
  label: name,
  icon: `https://flagcdn.com/w40/${code.toLowerCase()}.png`,
}));

const customSingleValue = ({ data }) => (
  <div className="flex items-center gap-2">
    <img src={data.icon} alt="flag" className="w-5 h-4 object-cover rounded-sm" />
    {data.label}
  </div>
);

const customOption = (props) => {
  const { data, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
    >
      <img src={data.icon} alt="flag" className="w-5 h-4 object-cover rounded-sm" />
      {data.label}
    </div>
  );
};

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    country: ""
  });
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setFormData({ ...formData, country: selectedOption?.label || "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        formData,
        { withCredentials: true }
      );
      console.log("Signup successful", response.data);
      navigate("/auth/login");
    } catch (err) {
      console.error("Signup failed!", err);
      setError(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white md:flex shadow-2xl rounded-xl overflow-hidden">
        {/* Left Panel */}
        <div className="bg-blue-600 text-white flex flex-col justify-center items-center min-w-80 px-6 py-8">
          <h1 className="text-3xl font-bold mb-4">Task Tracker</h1>
          <p className="text-sm text-center max-w-xs">
            Track your tasks, manage your works.
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="bg-white p-10 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
            Signup to TaskTracker
          </h2>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <Input
            label="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />

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

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Country</label>
            <Select
              options={countryOptions}
              value={selectedCountry}
              onChange={handleCountryChange}
              placeholder="Select a country"
              components={{ SingleValue: customSingleValue, Option: customOption }}
            />
          </div>

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-xs text-blue-500 mb-4"
          >
            {showPassword ? "Hide" : "Show"} password
          </button>

          <div className="flex text-sm items-center mb-4">
            <span className="text-gray-600">Already have an account?</span>
            <Link to="/auth/login">
              <span className="text-blue-600 font-medium ml-2 border-b-2 border-blue-600 cursor-pointer">
                Login
              </span>
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

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
        className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        required
      />
    </div>
  );
};

export default Signup;
