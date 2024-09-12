import React, { useState } from "react";
import axios from 'axios';
import { BsPersonCircle } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const notifyDanger = (message) => {
    toast.error(message, { autoClose: 3000 });
  };
  const notifySuccess = (message) => {
    toast.success(message, { autoClose: 3000 });
  };
  const [PasswordErr, setPasswordErr] = useState(false);
  const [responseMsg, setResponseMsg] = useState(null);

  function handlePasswordMatch(event) {
    const cpassword = document.getElementById("cpassword").value;
    const password = document.getElementById("password").value;

    if (cpassword !== password) {
      setPasswordErr(true);
    } else {
      setPasswordErr(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const Checkbtn = document.getElementById("check");

    if (PasswordErr || !name || !email || !password) {
      console.log("Cannot Submit form");
      return;
    }

    const Data = {
      name,
      email,
      password,
      cpassword: password,
      isAdmin: 0,
    };

    try {
      const response = await axios.post("http://localhost:3001/api/users/register/", Data);
      notifySuccess("Verification Link sent to Email");
    } catch (error) {
      notifyDanger(error.response?.data?.message || "An error occurred during Register.");
    }
  }

  function handleShowPassword(event) {
    const passwordBtn = document.getElementById("password");
    const passwordBtnType = passwordBtn.getAttribute("type");
    const passwordChangeBtn = document.getElementById("basic_addon1");

    if (passwordBtnType === "password") {
      passwordBtn.setAttribute("type", "text");
      passwordChangeBtn.innerText = "Hide Password";
    } else {
      passwordBtn.setAttribute("type", "password");
      passwordChangeBtn.innerText = "Show Password";
    }
  }

  return (
    <div className="container-fluid bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row w-full max-w-4xl">
        {/* <div className="md:w-1/2 flex items-center justify-center bg-cover bg-center p-6">
          <img
            src="https://img.freepik.com/free-photo/exploding-burger-with-vegetables-melted-cheese-black-background-generative-ai_157027-1734.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1713139200&semt=ais"
            className="w-3/5 mt-6"
            alt="Food"
          />
        </div> */}
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
          {responseMsg && (
            <div className={`alert alert-${responseMsg.type} flex items-center`} role="alert">
              {responseMsg.msg}
              <button
                type="button"
                className="btn-close ml-4"
                aria-label="Close"
                onClick={() => setResponseMsg(null)}
              ></button>
            </div>
          )}
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                name="name"
                id="name"
                className="form-input block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Name"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BsPersonCircle />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                className="form-input block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Email Id"
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <RiLockPasswordFill className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></RiLockPasswordFill>
              <input
                type="password"
                name="password"
                id="password"
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
          {PasswordErr && <div className="text-red-500 mb-2">Password is not matched</div>}
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
            className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600"
            onClick={handleSubmit}
          >
            Create Account
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
