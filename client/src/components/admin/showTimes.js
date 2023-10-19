import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';

function Showtimes() {
  const [listOfShowtimes, setListOfShowtimes] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/showtimes").then((response) => {
            setListOfShowtimes(response.data);
        });
    }, []);

    const deleteShowtime = (id) => {
      axios
        .delete(`http://localhost:3001/showtimes/${id}`)
        .then(() => {
          window.location.reload();
        });
      };
    
    return (
      <div><center><h1>The List of All the Showtimes</h1></center>
      <div>
      <center><button className="addbtn" onClick={()=> navigate("./createshowtime")}>Add Showtime</button></center>
      <div className="app-container">
        <table>
          <thead>
            <tr><th>Movie ID</th><th>Room ID</th><th>Show Date</th><th>Show Time</th><th colspan="2">Action</th></tr>
          </thead>
          <tbody>
            {listOfShowtimes.map((value, key) => (
              <tr>
                <td>{value.movie_id}</td><td>{value.room_id}</td><td>{value.show_date}</td><td>{value.show_time}</td>
                <td>
                  <button className="editbtn" onClick = {() => {
                    navigate(`/admin/showtime/${value.id}`)}}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className="deletebtn" onClick={() => {
                    deleteShowtime(value.id);}}>{" "}
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

export default Showtimes;

