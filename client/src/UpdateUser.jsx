import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./assests/logoFirst.svg";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdateUser() {
  const { id } = useParams();
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();
  const [dob, setDob] = useState(null);
  const navigate = useNavigate();
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidFname, setIsValidFname] = useState(true);
  const [isValidLname, setIsValidLname] = useState(true);
  const [isValidPhno, setIsValidPhno] = useState(true);
  const [IsValidDob, setIsValidDob] = useState(true);

  const validateEmail = (value) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(value);
  };

  const handleEmailChange = (e) => {
    const newValue = e.target.value;
    setEmail(newValue);
    const isValid = validateEmail(newValue);
    setIsValidEmail(isValid);
  };

  const validateFname = (value) => {
    const fNamePattern = /^[A-Za-z\s]+$/;
    return fNamePattern.test(value);
  };

  const handleFnameChange = (e) => {
    const newFname = e.target.value;
    setFirstName(newFname);
    const isValid = validateFname(newFname);
    setIsValidFname(isValid);
  };

  const validateLname = (value) => {
    const lNamePattern = /^[A-Za-z\s]+$/;
    return lNamePattern.test(value);
  };

  const handleLnameChange = (e) => {
    const newLname = e.target.value;
    setLastName(newLname);
    const isValid = validateLname(newLname);
    setIsValidLname(isValid);
  };

  const validatePhno = (value) => {
    const phnoPattern = /^\d{10}$/;
    return phnoPattern.test(value);
  };

  const handlePhnoChange = (e) => {
    const newPhno = e.target.value;
    setPhoneNumber(newPhno);
    const isvalid = validatePhno(newPhno);
    setIsValidPhno(isvalid);
  };
  const validateDob = (value) => {
    const enteredDate = new Date(value);
    const curnDate = new Date();
    console.log(curnDate);
    return enteredDate < curnDate;
  };

  const handleDobChange = (e) => {
    const newDob = e.target.value;
    setDob(newDob);
    const isValid = validateDob(newDob);
    setIsValidDob(isValid);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/getUser/${id}`);
        console.log(result);

        const userData = result.data;
        setEmail(userData.email);
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setPhoneNumber(userData.phoneNumber);
        setAddress(userData.address);
        setDob(userData.dob.slice(0, 10));
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  const Update = async (e) => {
    e.preventDefault();
    if (!email || !firstName || !lastName || !phoneNumber || !dob) {
      alert("All fields are required.");
      return;
    }

    if (!isValidEmail || !isValidFname || !isValidLname || !isValidPhno || !IsValidDob) {
      alert("Update valid information.");
      return;
    }
    try {
      const result = await axios.put("http://localhost:3001/updateuser/" + id, {
        email,
        firstName,
        lastName,
        phoneNumber,
        address,
        dob,
      });

      console.log(result);
      navigate("/user");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center mt-5">
        <img src={logo} alt="" />
      </div>
      <div className="container">
        <div className="w-50 bg-white rounded p-4">
          <form className="form-class" onSubmit={Update}>
            <h2>{firstName}'s Details</h2>
            <div className="row mb-2">
              <div className="col-md-3 d-flex align-items-center">
                <label
                  htmlFor=""
                  style={{
                    fontSize: "20px",
                    color: "#476309",
                    fontWeight: "bold",
                  }}
                >
                  Email:
                </label>
              </div>
              <div className="col-md-9">
                <input
                  style={{
                    fontSize: "17px",
                    color: "#000000",
                    fontFamily: "Copperplate",
                  }}
                  type="text"
                  className={`form-control ${isValidEmail ? "" : "is-invalid"}`}
                  placeholder="Email"
                  value={email}
                  autoComplete="off"
                  onChange={handleEmailChange}
                />
                {!isValidEmail && (
                  <div className="invalid-feedback">Update Valid Email</div>
                )}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-3 d-flex align-items-center">
                <label
                  htmlFor=""
                  style={{
                    fontSize: "20px",
                    color: "#476309",
                    fontWeight: "bold",
                  }}
                >
                  First Name:
                </label>
              </div>
              <div className="col-md-9">
                <input
                  style={{
                    fontSize: "17px",
                    color: "#000000",
                    fontFamily: "Copperplate",
                  }}
                  type="text"
                  className={`form-control ${isValidFname ? "" : "is-invalid"}`}
                  placeholder="First Name"
                  value={firstName}
                  autoComplete="off"
                  onChange={handleFnameChange}
                />
                {!isValidFname && (
                  <div className="invalid-feedback">Update Valid Name</div>
                )}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-3 d-flex align-items-center">
                <label
                  htmlFor=""
                  style={{
                    fontSize: "20px",
                    color: "#476309",
                    fontWeight: "bold",
                  }}
                >
                  Last Name:
                </label>
              </div>
              <div className="col-md-9">
                <input
                  style={{
                    fontSize: "17px",
                    color: "#000000",
                    fontFamily: "Copperplate",
                  }}
                  type="text"
                  className={`form-control ${isValidLname ? "" : "is-invalid"}`}
                  placeholder="Last Name"
                  value={lastName}
                  autoComplete="off"
                  onChange={handleLnameChange}
                />
                {!isValidLname && (
                  <div className="invalid-feedback">Update Valid Name</div>
                )}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-3 d-flex align-items-center">
                <label
                  htmlFor=""
                  style={{
                    fontSize: "20px",
                    color: "#476309",
                    fontWeight: "bold",
                  }}
                >
                  Phone Number:
                </label>
              </div>
              <div className="col-md-9">
                <input
                  style={{
                    fontSize: "17px",
                    color: "#000000",
                    fontFamily: "Copperplate",
                  }}
                  type="number"
                  className={`form-control ${isValidPhno ? "" : "is-invalid"}`}
                  placeholder="Phone Number"
                  value={phoneNumber}
                  autoComplete="off"
                  onChange={handlePhnoChange}
                />
                {!isValidPhno && (
                  <div className="invalid-feedback">
                    Update Valid Phone Number
                  </div>
                )}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-3 d-flex align-items-center">
                <label
                  style={{
                    fontSize: "20px",
                    color: "#476309",
                    fontWeight: "bold",
                  }}
                >
                  Address
                </label>
              </div>
              <div className="col-md-9">
                <textarea
                  style={{
                    fontSize: "17px",
                    color: "#000000",
                    fontFamily: "Copperplate",
                  }}
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  autoComplete="off"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-3 d-flex align-items-center">
                <label
                  style={{
                    fontSize: "20px",
                    color: "#476309",
                    fontWeight: "bold",
                  }}
                >
                  Date of Birth:
                </label>
              </div>
              <div className="col-md-9">
                <input
                  style={{
                    fontSize: "17px",
                    color: "#000000",
                    fontFamily: "Copperplate",
                  }}
                  type="date" min="1950-01-01" max="2023-08-31"
                  className={`form-control ${IsValidDob ? "" : "is-invalid"}`}
                  value={dob}
                  autoComplete="off"
                  onChange={handleDobChange}
                />
                {!IsValidDob && (
                  <div className="invalid-feedback">
                    Update Valid Date of Birth
                  </div>
                )}
              </div>
            </div>
            <div className="create-button">
              <button className="btn btn-success mr-2">Update</button>
              <Link className="btn btn-danger mr-2" to="/user">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
