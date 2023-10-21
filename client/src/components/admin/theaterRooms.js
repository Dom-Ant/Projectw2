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
    const [currentPage, setCurrentPage] = useState(1);
    const theaterroomsPerPage = 5;
    const lastIndex = currentPage * theaterroomsPerPage;
    const firstIndex = lastIndex - theaterroomsPerPage;
    const theaterrooms = listOfTheaterrooms.slice(firstIndex, lastIndex);
    const npage = Math.ceil(listOfTheaterrooms.length / theaterroomsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);
  
    return (
      <div><center><h1>The List of All the Theater Rooms</h1></center>
      <div>
      <center><button className="addbtn" onClick={()=> navigate("./createtheaterroom")}>Add Theater room</button></center>
      <div className="app-container">
        <table>
          <thead>
            <tr><th>Venue ID</th><th>Room Name</th><th>Seat Capacity</th><th>Seats Per Row</th><th colspan="2">Action</th></tr>
          </thead>
          <tbody>
            {theaterrooms.map((value, key) => (
              <tr>
                <td>{value.venue_id}</td><td>{value.name}</td><td>{value.seat_capacity}</td><td>{value.seats_per_row}</td>
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

export default Theaterrooms;
