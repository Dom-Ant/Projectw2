import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';

function Tickets() {
  const [listOfTickets, setListOfTickets] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/tickets").then((response) => {
            setListOfTickets(response.data);
        });
    }, []);

    const deleteTicket = (id) => {
      axios
        .delete(`http://localhost:3001/tickets/${id}`)
        .then(() => {
          window.location.reload();
        });
      };
    
    return (
      <div><center><h1>The List of All the Tickets</h1></center>
      <div>
      <center><button className="addbtn" onClick={()=> navigate("./createticket")}>Add Ticket</button></center>
      <div className="app-container">
        <table>
          <thead>
            <tr><th>Showtime ID</th><th>Ticket Price</th><th>Seat Number</th><th>User ID</th><th>Payment Status</th><th colspan="2">Action</th></tr>
          </thead>
          <tbody>
            {listOfTickets.map((value, key) => (
              <tr>
                <td>{value.showtime_id}</td><td>{value.ticket_price} $</td><td>{value.seat_number}</td><td>{value.user_id}</td><td>{value.payment_status}</td>
                <td>
                  <button className="editbtn" onClick = {() => {
                    navigate(`/admin/ticket/${value.id}`)}}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className="deletebtn" onClick={() => {
                    deleteTicket(value.id);}}>{" "}
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

export default Tickets;

