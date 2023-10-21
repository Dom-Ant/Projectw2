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
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 5;
    const lastIndex = currentPage * moviesPerPage;
    const firstIndex = lastIndex - moviesPerPage;
    const movies = listOfMovies.slice(firstIndex, lastIndex);
    const npage = Math.ceil(listOfMovies.length / moviesPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

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
            {movies.map((value, key) => (
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

export default Movies;

