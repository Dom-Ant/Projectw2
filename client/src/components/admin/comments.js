import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';

function Comments() {
  const [listOfComments, setListOfComments] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/comments").then((response) => {
            setListOfComments(response.data);
        });
    }, []);

    const deleteComment = (id) => {
      axios
        .delete(`http://localhost:3001/comments/${id}`)
        .then(() => {
          window.location.reload();
        });
      };
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 5;
    const lastIndex = currentPage * commentsPerPage;
    const firstIndex = lastIndex - commentsPerPage;
    const comments = listOfComments.slice(firstIndex, lastIndex);
    const npage = Math.ceil(listOfComments.length / commentsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);
  
    return (
      <div><center><h1>The List of All the Comments</h1></center>
      <div className="app-container">
        <table>
          <thead>
            <tr><th>User ID</th><th>Movie ID</th><th>Comment Text</th><th>Action</th></tr>
          </thead>
          <tbody>
            {comments.map((value, key) => (
              <tr>
                <td>{value.user_id}</td><td>{value.movie_id}</td><td>{value.comment_text}</td>
                <td>
                  <button className="deletebtn" onClick={() => {
                    deleteComment(value.id);}}>{" "}
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

export default Comments;

