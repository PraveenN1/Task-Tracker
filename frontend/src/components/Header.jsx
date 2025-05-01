import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";
import axios from "axios";

const Header = () => {
  const user= useCurrentUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout",{},{withCredentials:true});
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="p-4 rounded-md bg-white shadow-sm flex justify-between items-center px-6 md:px-10">
      <h1 className="text-2xl font-bold text-gray-800">Task Tracker</h1>

      <div className="flex gap-3 items-center">
        {user ? (
          <>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-full hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/auth/login">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition">
                Login
              </button>
            </Link>
            <Link to="/auth/signup">
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 transition">
                Signup
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
