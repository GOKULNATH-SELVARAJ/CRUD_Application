// import React, { useState } from 'react'

// function PhoneNumber({phoneNumber, setPhoneNumber}) {
//     const [isValidPhno, setIsValidPhno] = useState(true);
//      const validatePhno = (value) => {
//     const phnoPattern = /^\d{10}$/;
//     return phnoPattern.test(value);
//   };

//   const handlePhnoChange = (e) => {
//     const newPhno = e.target.value;
//     setPhoneNumber(newPhno);
//     const isvalid = validatePhno(newPhno);
//     setIsValidPhno(isvalid);
//   };
//   return (
//     <div className="col-md-9">
//                 <input
//                   type="number"
//                   className={`form-control ${isValidPhno ? "" : "is-invalid"}`}
//                   placeholder="Phone Number"
//                   autoComplete="off"
//                   onChange={handlePhnoChange}
//                 />
//                 {!isValidPhno && (
//                   <div className="invalid-feedback">
//                     Enter Valid Phone Number
//                   </div>
//                 )}
//               </div>
//   )
// }

// export default PhoneNumber

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import logo from "./assests/logoFirst.svg";
import { Link, useNavigate } from "react-router-dom";
import Label from "./components/Label";

function CreateUser() {
  const navigate = useNavigate();

  const initialFormState = {
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    dob: null,
  };

  const { formData, formErrors, handleChange, validateField, handleSubmit } =
    useFormValidation(initialFormState, submitForm);

  async function submitForm() {
    try {
      const response = await axios.post(
        "http://localhost:3001/createuser",
        formData
      );
      console.log(response.data);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert("An error occurred");
      }
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-center mt-5">
        <img src={logo} alt="" />
      </div>
      <div className="container">
        <div className="w-50 bg-white rounded p-4">
          <form className="form-class" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div className="row mb-2">
              <Label text={"Email"} />
              <div className="col-md-9">
                <input
                  type="text"
                  className={`form-control ${
                    formErrors.email ? "is-invalid" : ""
                  }`}
                  name="email"
                  id="email"
                  placeholder="Email"
                  autoComplete="off"
                  required="true"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => validateField("email", formData.email)}
                />
                {formErrors.email && (
                  <div className="invalid-feedback">{formErrors.email}</div>
                )}
              </div>
            </div>
            <div className="row mb-2">
              <Label text={"First Name"} />
              <div className="col-md-9">
                <input
                  type="text"
                  className={`form-control ${
                    formErrors.firstName ? "is-invalid" : ""
                  }`}
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  autoComplete="off"
                  required="true"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={() => validateField("firstName", formData.firstName)}
                />
                {formErrors.firstName && (
                  <div className="invalid-feedback">{formErrors.firstName}</div>
                )}
              </div>
            </div>
            <div className="row mb-2">
              <Label text={"Last Name"} />
              <div className="col-md-9">
                <input
                  type="text"
                  className={`form-control ${
                    formErrors.lastName ? "is-invalid" : ""
                  }`}
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  autoComplete="off"
                  required="true"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={() => validateField("lastName", formData.lastName)}
                />
                {formErrors.lastName && (
                  <div className="invalid-feedback">{formErrors.lastName}</div>
                )}
              </div>
            </div>
            <div className="row mb-2">
              <Label text={"Phone Number"} />
              <div className="col-md-9">
                <input
                  type="text"
                  className={`form-control ${
                    formErrors.phoneNumber ? "is-invalid" : ""
                  }`}
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  autoComplete="off"
                  required="true"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  onBlur={() =>
                    validateField("phoneNumber", formData.phoneNumber)
                  }
                />
                {formErrors.phoneNumber && (
                  <div className="invalid-feedback">
                    {formErrors.phoneNumber}
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
                  name="address"
                  id="address"
                  placeholder="Address"
                  autoComplete="off"
                  required="true"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-2">
              <Label text={"Date of Birth"} />
              <div className="col-md-9">
                <input
                  type="date"
                  className={`form-control ${
                    formErrors.dob ? "is-invalid" : ""
                  }`}
                  name="dob"
                  id="dob"
                  autoComplete="off"
                  required="true"
                  value={formData.dob}
                  onChange={handleChange}
                  onBlur={() => validateField("dob", formData.dob)}
                />
                {formErrors.dob && (
                  <div className="invalid-feedback">{formErrors.dob}</div>
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

function useFormValidation(initialState, onSubmit) {
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const isValid = Object.values(formErrors).every((error) => !error);
      if (isValid) {
        onSubmit();
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
      }
    }
  }, [formErrors, isSubmitting, onSubmit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(value)) {
          setFormErrors({
            ...formErrors,
            [name]: "Email is invalid",
          });
        } else {
          setFormErrors({
            ...formErrors,
            [name]: "",
          });
        }
        break;
      case "firstName":
        const fNamePattern = /^[A-Za-z\s]+$/;
        if (!fNamePattern.test(value)) {
          setFormErrors({
            ...formErrors,
            [name]: "Name is invalid",
          });
        } else {
          setFormErrors({
            ...formErrors,
            [name]: "",
          });
        }
        break;
      case "lastName":
        const lNamePattern = /^[A-Za-z\s]+$/;
        if (!lNamePattern.test(value)) {
          setFormErrors({
            ...formErrors,
            [name]: "Name is invalid",
          });
        } else {
          setFormErrors({
            ...formErrors,
            [name]: "",
          });
        }
        break;
      case "phoneNumber":
        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(value)) {
          setFormErrors({
            ...formErrors,
            [name]: "Phone Number is invalid",
          });
        } else {
          setFormErrors({
            ...formErrors,
            [name]: "",
          });
        }
        break;
      case "dob":
        const enteredDate = new Date(value);
        const currentDate = new Date();
        if (enteredDate > currentDate) {
          setFormErrors({
            ...formErrors,
            [name]: "Date of Birth is Invalid",
          });
        } else {
          setFormErrors({
            ...formErrors,
            [name]: "",
          });
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    for (const field in formData) {
      validateField(field, formData[field]);
    }
  };

  return {
    formData,
    formErrors,
    handleChange,
    validateField,
    handleSubmit,
  };
}
