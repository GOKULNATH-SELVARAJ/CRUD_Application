import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./assests/logoFirst.svg";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ViewUser() {
  const { id } = useParams();
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();
  const [dob, setDob] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/viewUser/${id}`);
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

  return (
    <div>
      <div className="d-flex justify-content-center mt-5">
        <img src={logo} alt=""/>
      </div>
      <div className="container">
        <div className="w-50 bg-white rounded p-4">
          <form className="form-class">
            <h2 style={{ fontSize: "40px", color: "#002633" }}>
              {firstName}'s Information
            </h2>
            <div className="row mb-2">
              <div className="col-md-3 d-flex align-items-center">
                <label
                  htmlFor="email"
                  style={{
                    fontSize: "20px",
                    color: "#566cc7",
                    fontWeight: "bold",
                  }}
                >
                  Email:
                </label>
              </div>
              <div className="col-md-9">
                <input
                  style={{
                    fontFamily:"Copperplate",
                    fontSize: "17px",
                    color: "#000000",
                    
                  }}
                  className="form-control"
                  value={email}
                  readOnly
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-3 d-flex align-items-center">
                <label
                  htmlFor=""
                  style={{
                    fontSize: "20px",
                    color: "#566cc7",
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
                    fontFamily:"Copperplate",
                  }}
                  type="text"
                  className="form-control"
                  value={firstName}
                  readOnly
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-3 d-flex align-items-center">
                <label
                  htmlFor=""
                  style={{
                    fontSize: "20px",
                    color: "#566cc7",
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
                    fontFamily:"Copperplate",
                  }}
                  type="text"
                  className="form-control"
                  value={lastName}
                  readOnly
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-3 d-flex align-items-center">
                <label
                  htmlFor=""
                  style={{
                    fontSize: "20px",
                    color: "#566cc7",
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
                    fontFamily:"Copperplate",
                  }}
                  type="number"
                  className="form-control"
                  value={phoneNumber}
                  readOnly
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-3 d-flex align-items-center">
                <label
                  style={{
                    fontSize: "20px",
                    color: "#566cc7",
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
                    fontFamily:"Copperplate",
                  }}
                  type="text"
                  className="form-control"
                  value={address}
                  rows={2}
                  readOnly
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-3 d-flex align-items-center">
                <label
                  style={{
                    fontSize: "20px",
                    color: "#566cc7",
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
                    fontFamily:"Copperplate",
                  }}
                  type="date"
                  className="form-control"
                  value={dob}
                  readOnly
                />
              </div>
            </div>
            <div className="create-button">
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

export default ViewUser;
