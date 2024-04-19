import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css'

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
        { email, password }, {
        withCredentials: true
      }
      );

      if (response.status === 200) {
        console.log(response.data)
        // const authToken = response.headers["authorization"];
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
    <div className="container-fluid login">
      <div className="row">
        <form
          className="register_form my-5 col-lg-8 col-md-9 col-sm-11"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <h1 className="mt-2">Welcome Back</h1>
          <p className="mt-3">Sign in with Email and Password</p>
          {responseMsg && (
            <div className={`alert alert-${responseMsg.type}`} role="alert">
              {responseMsg.msg}
            </div>
          )}

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Email Id
              </span>
            </div>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="Email Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Password
              </span>
            </div>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <div className="input-group-append">
              <div className="input-group-text">
                <input
                  type="checkbox"
                  id="showPassword"
                  onChange={() => setPasswordVisible(!passwordVisible)}
                />
                <label htmlFor="showPassword" className="mx-2">
                  Show Password
                </label>
              </div>
            </div> */}
          </div>

          <input type="submit" value="Login" className="btn btn-success my-3" />
          <input
            type="reset"
            value="Cancel"
            className="btn btn-outline-danger mx-2 my-3"
          />
          <h5 className="mt-2">
            New User? <a href="/register">Register here</a>
          </h5>
        </form>
      </div>
    </div>
  );
}

export default Login;
