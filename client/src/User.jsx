import axios from "axios";
import "./App.css";
import logo from "./assests/logoFirst.svg";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function User() {
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false)
  const [users, setUsers] = useState([
    {
      firstName: "yourself",
      email: "ys@gmail.com",
      lastName: "only",
      phoneNumber: 9404484940,
    },
  ]);
  //logout function
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('auth');
    setLogout(true)
  }

  useEffect(() => {
    if (!localStorage.getItem("auth")) navigate("/login");
  }, [logout]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const result = await axios.get("http://localhost:3001");
        setUsers(result.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:3001/deleteuser/${id}`
        );
        console.log(response);
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }

   
  };

  return (
    <div>
      <div className="d-flex justify-content-start mt-5">
        <img src={logo} alt="" />
      </div>
      <div className="container ">
        <div className="custom-box ">
          <div className="create-log-btn">
            <button
              className="btn btn-danger"
              onClick={ handleLogout }   >
              Logout
            </button>
            <Link to="/create" className="btn btn-success ">
              Add +
            </Link>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr>
                    <td>{user.email}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.dob}</td>
                    <td className="action">
                      <Link
                        to={`/view/${user._id}`}
                        className="btn btn-primary"
                      >
                        View
                      </Link>
                      <Link
                        to={`/update/${user._id}`}
                        className="btn btn-success"
                      >
                        Update
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default User;
