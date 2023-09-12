// import React, { useState } from 'react'

// function Email({email, setEmail}) {

//     const [isValidEmail, setIsValidEmail] = useState(true)
//     // const [email, setEmail] = useState("");
//     const [error, setError] = useState("");

//     const validateEmail = (value) => {
//         const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//         return emailPattern.test(value);
//       };
    
//       const handleEmailChange = (e) => {
//         const newValue = e.target.value;
//         setEmail(newValue);
//         const isValid = validateEmail(newValue);
//         setIsValidEmail(isValid);
//       };
    
//   return (
//     <div className="col-md-9">
//                 <input
//                   type="text"
//                   className={`form-control ${isValidEmail ? "" : "is-invalid"}`}
//                   placeholder="Email"
//                   autoComplete="off"
//                   onChange={handleEmailChange}
//                 />
//                 {!isValidEmail && (
//                   <div className="invalid-feedback">Email is Invalid</div>
//                 )}
//                 {error && (
//                   <div className="alert alert-danger" role="alert">
//                     {error}
//                   </div>
//                 )}
//               </div>
//   )
// }

// export default Email






import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import logo from "./assests/logoFirst.svg";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";

import Label from "./components/Label";

function CreateUser() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState(null);
  const navigate = useNavigate();
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidFname, setIsValidFname] = useState(true);
  const [isValidLname, setIsValidLname] = useState(true);
  const [isValidPhno, setIsValidPhno] = useState(true);
  const [isValidDob, setIsValidDob] = useState(true);

  const validateEmail = (value) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(value);
  };

  const handleEmailChange = (e) => {
    const newValue = e.target.value;
    setEmail(newValue);

    if (validateEmail(newValue)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  const validateFname = (value) => {
    const fNamePattern = /^[A-Za-z\s]+$/;
    return fNamePattern.test(value);
  };

  const handleFnameChange = (e) => {
    const newFname = e.target.value;
    setFirstName(newFname);

    if (validateFname(newFname)) {
      setIsValidFname(true);
    } else {
      setIsValidFname(false);
    }
  };

  const validateLname = (value) => {
    const lNamePattern = /^[A-Za-z\s]+$/;
    return lNamePattern.test(value);
  };

  const handleLnameChange = (e) => {
    const newLname = e.target.value;
    setLastName(newLname);

    if (validateLname(newLname)) {
      setIsValidLname(true);
    } else {
      setIsValidLname(false);
    }
  };

  const validatePhno = (value) => {
    const phnoPattern = /^\d{10}$/;
    return phnoPattern.test(value);
  };

  const handlePhnoChange = (e) => {
    const newPhno = e.target.value;
    setPhoneNumber(newPhno);

    if (validatePhno(newPhno)) {
      setIsValidPhno(true);
    } else {
      setIsValidPhno(false);
    }
  };

  const validateDob = (value) => {
    const enteredDate = new Date(value);
    const currentDate = new Date();
    return enteredDate < currentDate;
  };

  const handleDobChange = (e) => {
    const newDob = e.target.value;
    setDob(newDob);

    if (validateDob(newDob)) {
      setIsValidDob(true);
    } else {
      setIsValidDob(false);
    }
  };

  const Submit = async (e) => {
    e.preventDefault();

    if (!email || !firstName || !lastName || !phoneNumber || !dob) {
      alert("All fields are required.");
      return;
    }

    if (!isValidEmail || !isValidFname || !isValidLname || !isValidPhno || !isValidDob) {
      // alert("Please enter valid information in all fields.");
      return;
    }

    try {
      const newData = await axios.post("http://localhost:3001/createuser", {
        email,
        firstName,
        lastName,
        phoneNumber,
        dob,
      });
      console.log(newData);
      navigate("/");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.error) {
        alert(err.response.data.error);
        setError(err.response.data.error);
      } else {
        alert("An error occurred")
        setError("An error occurred");
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center mt-5">
        <img src={logo} alt="" />
      </div>
      <div className="container">
        <div className="w-50 bg-white rounded p-4">
          <form className="form-class" onSubmit={Submit}>
            <h2>Register</h2>
            <div className="row mb-2">
              <Label text={"Email"} />
              <div className="col-md-9">
                <input
                  type="text"
                  className={`form-control ${isValidEmail ? "" : "is-invalid"}`}
                  placeholder="Email"
                  autoComplete="off"
                  onChange={handleEmailChange}
                />
                {!isValidEmail && (
                  <div className="invalid-feedback">Email is Invalid</div>
                )}
                
              </div>
            </div>
            <div className="row mb-2">
              <Label text={"First Name"} />
              <div className="col-md-9">
                <input
                  type="text"
                  className={`form-control ${isValidFname ? "" : "is-invalid"}`}
                  placeholder="First Name"
                  autoComplete="off"
                  onChange={handleFnameChange}
                />
                {!isValidFname && (
                  <div className="invalid-feedback">Enter Valid Name</div>
                )}
              </div>
            </div>
            <div className="row mb-2">
              <Label text={"Last Name"} />
              <div className="col-md-9">
                <input
                  type="text"
                  className={`form-control ${isValidLname ? "" : "is-invalid"}`}
                  placeholder="Last Name"
                  autoComplete="off"
                  onChange={handleLnameChange}
                />
                {!isValidLname && (
                  <div className="invalid-feedback">Enter Valid Name</div>
                )}
              </div>
            </div>
            <div className="row mb-2">
              <Label text={"Phone Number"} />
              <div className="col-md-9">
                <input
                  type="number"
                  className={`form-control ${isValidPhno ? "" : "is-invalid"}`}
                  placeholder="Phone Number"
                  autoComplete="off"
                  onChange={handlePhnoChange}
                />
                {!isValidPhno && (
                  <div className="invalid-feedback">
                    Enter Valid Phone Number
                  </div>
                )}
              </div>
            </div>
            <div className="row mb-2">
              <Label text={"Address"} />
              <div className="col-md-9">
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  autoComplete="off"
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            <div className="row mb-2">
              <Label text={"Date of Birth"} />
              <div className="col-md-9">
                <input
                  type="date"
                  className={`form-control ${isValidDob ? "" : "is-invalid"}`}
                  autoComplete="off"
                  onChange={handleDobChange}
                />
                {!isValidDob && (
                  <div className="invalid-feedback">
                    Enter Valid Date of Birth
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-center mb-2">
              <button className="btn btn-success mr-2">Submit</button>
              <Link to="/" className="btn btn-danger ml-3">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
