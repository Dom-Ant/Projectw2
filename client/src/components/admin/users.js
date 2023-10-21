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
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;
  const users = listOfUsers.slice(firstIndex, lastIndex);
  const npage = Math.ceil(listOfUsers.length / usersPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

    return (
      <div><center><h1>The List of All the Users</h1></center>
      <div className="app-container">
        <table>
          <thead>
            <tr><th>Username</th><th>Email</th><th>Role</th><th colspan="2">Action</th></tr>
          </thead>
          <tbody>
            {users.map((value, key) => (
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


        <center>
              <div><button href="#" className="page-link next-prev-btn"
                onClick={prePage}>Previous Page
              </button></div><br></br>
            {
              numbers.map((n, i) => (
                <div className={`page-link ${currentPage === n ? 'active' : ''}`} key={i}>
                  <button href="#" className="page-link page-item-btn"
                  onClick={() => changeCPage(n)}
                  >{n}</button>
                </div>
              ))
            }<br></br>
              <div><button href="#" className="page-link next-prev-btn"
                onClick={nextPage}>Next Page
              </button></div>
              </center>


      </div>
      </div>
    );

    function prePage() {
      if (currentPage !== 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  
    function changeCPage(id) {
      setCurrentPage(id);
    }
  
    function nextPage() {
      if (currentPage !== npage) {
        setCurrentPage(currentPage + 1);
      }
    }
  
}

export default Users;
