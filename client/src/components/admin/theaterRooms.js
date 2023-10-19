import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';

function Theaterrooms() {
  const [listOfTheaterrooms, setListOfTheaterrooms] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/theaterRooms").then((response) => {
            setListOfTheaterrooms(response.data);
        });
    }, []);

    const deleteTheaterroom = (id) => {
      axios
        .delete(`http://localhost:3001/theaterRooms/${id}`)
        .then(() => {
          window.location.reload();
        });
      };
    
    return (
      <div><center><h1>The List of All the Theater Rooms</h1></center>
      <div>
      <center><button className="addbtn" onClick={()=> navigate("./createtheaterroom")}>Add Theater room</button></center>
      <div className="app-container">
        <table>
          <thead>
            <tr><th>Venue ID</th><th>Room Name</th><th>Seat Capacity</th><th colspan="2">Action</th></tr>
          </thead>
          <tbody>
            {listOfTheaterrooms.map((value, key) => (
              <tr>
                <td>{value.venue_id}</td><td>{value.name}</td><td>{value.seat_capacity}</td>
                <td>
                  <button className="editbtn" onClick = {() => {
                    navigate(`/admin/theaterroom/${value.id}`)}}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className="deletebtn" onClick={() => {
                    deleteTheaterroom(value.id);}}>{" "}
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

export default Theaterrooms;
