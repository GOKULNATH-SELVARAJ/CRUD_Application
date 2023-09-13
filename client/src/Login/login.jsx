import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  emailValidator,
  passwordValidator,
} from "../components/regexValidator";
import "../Login/login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({ email: "", password: "" });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [buttonClicked, setButtonClicked] = useState(""); // State variable to track which button was clicked

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("auth")) navigate("/user");
  }, []);

  const formSubmitter = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    if (!emailValidator(input.email))
      return setErrorMessage("Please enter a valid email id");

    if (!passwordValidator(input.password))
      return setErrorMessage("Invalid Password");

    try {
      const response = await axios.post("http://localhost:3001/check-mail", {
        email: input.email,
      });

      if (response.data.exists) {
        // Email exists in the database, proceed with login
        setSuccessMessage("Successfully Validated");
        // Add your logic for login here, e.g., redirect to the dashboard
        localStorage.setItem("auth", true);
        navigate("/user");
      } else {
        setErrorMessage("Email does not exist");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred");
    }
  };

  const handleLoginButtonClick = (e) => {
    e.preventDefault();    
    formSubmitter(e);
  };

  const handleSignInButtonClick = () => {

    navigate("/create");
  };

  return (
    <div>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
            <form
              className="login100-form validate-form"
              onSubmit={formSubmitter}
            >
              <span className="login100-form-title p-b-49">Login</span>
              {errorMessage.length > 0 && (
                <div style={{ marginBottom: "10px", color: "red" }}>
                  {errorMessage}
                </div>
              )}
              {successMessage.length > 0 && (
                <div style={{ marginBottom: "10px", color: "green" }}>
                  {successMessage}
                </div>
              )}
              <div
                className="wrap-input100 validate-input m-b-23"
                data-validate="email is required"
              >
                <span className="label-input100">Email</span>
                <input
                  className="input100"
                  type="text"
                  name="email"
                  placeholder="Type your username"
                  onChange={handleChange}
                />
                <span className="focus-input100" data-symbol="" />
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <span className="label-input100">Password</span>
                <input
                  className="input100"
                  type="password"
                  name="password"
                  placeholder="Type your password"
                  onChange={handleChange}
                />
                <span className="focus-input100" data-symbol="" />
              </div>
              <div className="text-right p-t-8 p-b-31">
                <a href="#">Forgot password?</a>
              </div>
              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn" />
                  <button
                    type="button"
                    className="login100-form-btn"
                    onClick={handleLoginButtonClick}
                  >
                    Login
                  </button>
                </div>
              </div>
              <div className="txt1 text-center p-t-20 p-b-20">
                <span>Or</span>
              </div>
              <div className="container-login100-form-btn-signin">
                <div className="wrap-login100-form-btn-signin">
                  <div className="login100-form-bgbtn-signin" />
                  <button
                    type="button"
                    className="login100-form-btn-signin"
                    onClick={handleSignInButtonClick}
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
