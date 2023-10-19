import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';

function Movies() {
  const [listOfMovies, setListOfMovies] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/movies").then((response) => {
            setListOfMovies(response.data);
        });
    }, []);

    const deleteMovie = (id) => {
      axios
        .delete(`http://localhost:3001/movies/${id}`)
        .then(() => {
          window.location.reload();
        });
      };
    
    return (
      <div><center><h1>The List of All the Movies</h1></center>
      <div>
      <center><button className="addbtn" onClick={()=> navigate("./createmovie")}>Add Movie</button></center>
      <div className="app-container">
        <table>
          <thead>
            <tr><th>Movie Name</th><th>Genre</th><th>Duration</th><th colspan="2">Action</th></tr>
          </thead>
          <tbody>
            {listOfMovies.map((value, key) => (
              <tr>
                <td>{value.title}</td><td>{value.genre}</td><td>{value.duration} min</td>
                <td>
                  <button className="editbtn" onClick = {() => {
                    navigate(`/admin/movie/${value.id}`)}}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className="deletebtn" onClick={() => {
                    deleteMovie(value.id);}}>{" "}
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      </div>
    );
}

export default Movies;

