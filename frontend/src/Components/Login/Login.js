import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { ChefHat } from "lucide-react";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [responseMsg, setResponseMsg] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setResponseMsg({ type: "danger", msg: "Email and password are required." });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/login/",
        { email, password },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const authToken = response.data["token"];
        localStorage.setItem("authToken", authToken);
        setResponseMsg({ type: "success", msg: "Login successful!" });
        navigate("/profile");
      } else {
        setResponseMsg({ type: "danger", msg: "Unexpected response from the server." });
      }
    } catch (error) {
      setResponseMsg({
        type: "danger",
        msg: error.response?.data?.message || "An error occurred during login.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex align-items-center justify-center">
        <ChefHat size={50}></ChefHat>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 text-center">Welcome Back</h1>
        <p className="text-gray-600 text-center mt-2">Sign in with Email and Password</p>

        {responseMsg && (
          <div
            className={`mt-4 p-2 text-center rounded ${
              responseMsg.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {responseMsg.msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <div className="relative">
            <FaRegUserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              id="email"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Email Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <RiLockPasswordLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="inline-flex items-center text-gray-600">
              <input
                type="checkbox"
                className="form-checkbox"
                onChange={() => setPasswordVisible(!passwordVisible)}
              />
              <span className="ml-2">Show Password</span>
            </label>
          </div>

          <div className="space-y-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <h5 className="text-gray-600">
            New User?{" "}
            <a href="/register" className="text-indigo-600 hover:underline">
              Register here
            </a>
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Login;
