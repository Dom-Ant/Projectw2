import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function TicketId() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [ticketObject, setTicketObject] = useState({});
    const [tempTicketObject, setTempTicketObject] = useState({});
    const [notFound, setNotFound] = useState();
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        
        axios.get(`http://localhost:3001/tickets/byId/${id}`).then((response) => {
            setTicketObject(response.data);
            setTempTicketObject(response.data);
        });
    }, []);

    function updateTicketObject() {
        axios.put(`http://localhost:3001/tickets/update/${id}`, tempTicketObject).then((response) => {
            navigate("/admin/tickets");
        });
    }
    
    return (
        <div className='createPostPage'>
                {<div className='formContainer'>
                    <label>Showtime ID: </label>
                    <input type="text" id="inputCreatePost" name="showtime_id" value = {tempTicketObject.showtime_id}
                    onChange={(e) => {
                        setChanged(true);
                        setTempTicketObject({...tempTicketObject, showtime_id: e.target.value})
                    }}/>

                    <label>Ticket Price: </label>
                    <input type="text" id="inputCreatePost" name="ticket_price" value = {tempTicketObject.ticket_price}
                    onChange={(e) => {
                        setChanged(true);
                        setTempTicketObject({...tempTicketObject, ticket_price: e.target.value})
                    }}/>

                    <label>Seat Number: </label>
                    <input type="text" id="inputCreatePost" name="seat_number" value = {tempTicketObject.seat_number}
                    onChange={(e) => {
                        setChanged(true);
                        setTempTicketObject({...tempTicketObject, seat_number: e.target.value})
                    }}/>

                    <label>User ID: </label>
                    <input type="text" id="inputCreatePost" name="user_id" value = {tempTicketObject.user_id}
                    onChange={(e) => {
                        setChanged(true);
                        setTempTicketObject({...tempTicketObject, user_id: e.target.value})
                    }}/>

                    <label>Payment Status: </label>
                    <input type="text" id="inputCreatePost" name="payment_status" value = {tempTicketObject.payment_status}
                    onChange={(e) => {
                        setChanged(true);
                        setTempTicketObject({...tempTicketObject, payment_status: e.target.value})
                    }}/>
                        <>
                            <center><button
                                onClick={(e) => {
                                    setTempTicketObject({...ticketObject});
                                    setChanged(false);
                                }}
                            >
                                Cancel
                            </button>{' '}</center>
                            
                            <center><button onClick={updateTicketObject}>Save</button></center>
                            </>
                    <center><button className="body" onClick={()=> navigate("../admin/tickets")}>Back</button></center>
                </div> }
                
        </div>
    );
}
export default TicketId;