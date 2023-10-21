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
    const [currentPage, setCurrentPage] = useState(1);
    const ticketsPerPage = 5;
    const lastIndex = currentPage * ticketsPerPage;
    const firstIndex = lastIndex - ticketsPerPage;
    const tickets = listOfTickets.slice(firstIndex, lastIndex);
    const npage = Math.ceil(listOfTickets.length / ticketsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);
  
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
            {tickets.map((value, key) => (
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

export default Tickets;

