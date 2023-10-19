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
    
    return (
      <div><center><h1>The List of All the Comments</h1></center>
      <div className="app-container">
        <table>
          <thead>
            <tr><th>User ID</th><th>Movie ID</th><th>Comment Text</th><th>Action</th></tr>
          </thead>
          <tbody>
            {listOfComments.map((value, key) => (
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
      </div>
      </div>
    );
}

export default Comments;

