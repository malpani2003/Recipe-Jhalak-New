import React, { useState } from "react";
import './Register.css'
import axios from 'axios'
function Register() {

  const [PasswordErr,setPasswordErr]=useState(false);
  const [responseMsg, setResponseMsg] = useState(null);

  function handlePasswordMatch(event){
    const cpassword=document.getElementById("cpassword").value;
    const password=document.getElementById("password").value;

    if(cpassword!=password){
      setPasswordErr(true);
    }
    else{
      setPasswordErr(false);
    }
    // console.log(password,cpassword);
  }

  async function handleSubmit(event){
    
    event.preventDefault();
    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const cpassword=document.getElementById('cpassword').value;
    const Checkbtn=document.getElementById("check");

    console.log(Checkbtn);
    if(PasswordErr || !name || !email || !password ){
      console.log("Cannot Submitt form");
    }
    console.log(name,email,password);
    const Data={
      "name":name,
      "email":email,
      "password":password,
      "cpassword":cpassword,
      "isAdmin":0
    }
    try{
      const response=await axios.post("http://localhost:3001/api/users/register/",Data);
      console.log(response);
      setResponseMsg({ type: "success", msg: "Register successful!" });
    }
    catch(error){
      setResponseMsg({
        type: "danger",
        msg: error.response?.data?.message || "An error occurred during Register.",
      });
    }

    }

  function handleShowpassword(event){
      const passwordBtn=document.getElementById("password");
      const passwordBtnType=passwordBtn.getAttribute("type");
      const passwordChangeBtn=document.getElementById("basic_addon1");

      if(passwordBtnType=="password"){
        passwordBtn.setAttribute("type","text");
        passwordChangeBtn.innerText="Hide Password";
      }
      else{
        passwordBtn.setAttribute("type","password");
        passwordChangeBtn.innerText="Show Password";

      }


  }
  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-5 side_form">
          {/* <img
            src="https://cdn-icons-png.flaticon.com/512/219/219969.png"
            alt=""
          ></img> */}
          <h3>Register Form</h3>
          <p>
            Register with Recipe Jhalak to receive the most recent recipes and
            information on website updates. Register by completing the form.
          </p>
          <a href="">Terms & Condition</a>
        </div>

        <form
          class="register_form my-5 col-md-7"
          autocomplete="off"
          onSubmit={handleSubmit}
        >
          <h3>Fill out this form</h3>
          {/* <label for="" class="form-label">
            Name
          </label> */}
          {responseMsg && (
            <div className={`alert alert-${responseMsg.type}`} role="alert">
              {responseMsg.msg}
            </div>
          )}
          <div class="input-group mb-3 my-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                Name
              </span>
            </div>
            <input
              type="text"
              name="name"
              id="name"
              class="form-control"
              placeholder="Name"
            />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                Email Id
              </span>
            </div>
            <input
              type="email"
              name="email"
              id="email"
              class="form-control"
              placeholder="Email Id"
            />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                Password
              </span>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              class="form-control"
              placeholder="Password"
            />
            <div class="input-group-append">
              <span class="input-group-text" id="basic_addon1" onClick={handleShowpassword}>
                Show Password
              </span>
            </div>
          </div>
          {PasswordErr?<div class="my-2 text-danger">Password is not matched</div>:<div></div>}
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                Confirm Password
              </span>
            </div>
            <input
              type="password"
              name="cpassword"
              id="cpassword"
              class="form-control"
              placeholder="Confirm Password"
              onInput={handlePasswordMatch}
            />
          </div>
          {/* <input type="text" name="name" id="name" class="form-control"/> */}
          {/* <label for="" class="form-label">
            Email id
          </label>
          <label for="" class="form-label">
            Password
          </label> */}
          <div class="error my-2 text-danger"></div>
          <p class="form-label">
            <input type="checkbox" name="check" id="check" value="on" defaultChecked="true"/>
              &nbsp; I agree to <b>Terms and Condition </b> and Privacy Policy
          </p>
          <input
            type="submit"
            value="Create Account"
            class="btn btn-success my-3"
          />
          <input
            type="reset"
            value="Cancel"
            class="btn btn-outline-danger my-3 mx-2"
            onClick={()=>{setResponseMsg(null)}}
          />
        </form>
      </div>
    </div>
  );
}

export default Register;
