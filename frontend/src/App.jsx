import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
