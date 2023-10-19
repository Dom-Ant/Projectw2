import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';

function Users() {
  const [listOfUsers, setListOfUsers] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/users").then((response) => {
            setListOfUsers(response.data);
        });
    }, []);

    const deleteUser = (id) => {
  axios
    .delete(`http://localhost:3001/users/${id}`)
    .then(() => {
      window.location.reload();
    });
  };

    return (
      <div><center><h1>The List of All the Users</h1></center>
      <div className="app-container">
        <table>
          <thead>
            <tr><th>Username</th><th>Email</th><th>Role</th><th colspan="2">Action</th></tr>
          </thead>
          <tbody>
            {listOfUsers.map((value, key) => (
              <tr>
                <td>{value.username}</td><td>{value.email}</td><td>{value.role}</td>
                <td>
                  <button className="editbtn" onClick = {() => {
                    navigate(`/admin/user/${value.id}`)}}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className="deletebtn" onClick={() => {
                    deleteUser(value.id);}}>{" "}
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    );
}

export default Users;
