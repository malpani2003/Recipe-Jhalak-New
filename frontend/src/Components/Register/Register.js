import React, { useState } from "react";
import axios from 'axios';
import { BsPersonCircle } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [PasswordErr, setPasswordErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const notifyDanger = (message) => {
    toast.error(message, { autoClose: 3000 });
  };
  const notifySuccess = (message) => {
    toast.success(message, { autoClose: 3000 });
  };
  const notifyInfo = (message) => {
    toast.info(message, { autoClose: 3000 });
  };

  function handlePasswordMatch() {
    if (cpassword !== password) {
      setPasswordErr(true);
    } else {
      setPasswordErr(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (PasswordErr || !name || !email || !password) {
      notifyDanger("Please fill all fields correctly.");
      return;
    }

    const Data = {
      name,
      email,
      password,
      cpassword,
      isAdmin: 0,
    };

    try {
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, Data);
      notifySuccess("Verification Link sent to Email");
    } catch (error) {
      notifyDanger(error.response?.data?.message || "An error occurred during Register.");
    } finally {
      setLoading(false);
    }
  }

  function handleShowPassword() {
    const passwordField = document.getElementById("password");
    const passwordType = passwordField.getAttribute("type");
    const passwordToggleBtn = document.getElementById("basic_addon1");

    if (passwordType === "password") {
      passwordField.setAttribute("type", "text");
      passwordToggleBtn.innerText = "Hide Password";
    } else {
      passwordField.setAttribute("type", "password");
      passwordToggleBtn.innerText = "Show Password";
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row w-full max-w-4xl">
        <form
          className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg border border-gray-200"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <h3 className="text-2xl font-semibold mb-4">Fill out this form</h3>
          <p className="mb-4">
            Register with Recipe Jhalak to receive the most recent recipes and
            information on website updates. Register by completing the form.
          </p>

          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Name"
              />
              {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BsPersonCircle />
              </div> */}
            </div>
          </div>

          <div className="mb-4">
            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Email Id"
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="relative">
              {/* <RiLockPasswordFill className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></RiLockPasswordFill> */}
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={handlePasswordMatch}
                className="form-input block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Password"
              />
              <div
                id="basic_addon1"
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={handleShowPassword}
              >
                Show Password
              </div>
            </div>
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="cpassword"
              id="cpassword"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
              onKeyUp={handlePasswordMatch}
              className="form-input block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Confirm Password"
            />
            {PasswordErr && <div className="text-red-500 mb-2">Passwords do not match</div>}
          </div>

          <div className="mb-4">
            <input
              type="checkbox"
              name="check"
              id="check"
              defaultChecked
              className="mr-2"
            />
            I agree to <b>Terms and Condition</b> and Privacy Policy
          </div>

          <button
            type="submit"
            className={`bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
