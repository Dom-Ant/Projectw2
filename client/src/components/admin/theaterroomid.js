import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function TheaterRoomId() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [theaterRoomObject, setTheaterRoomObject] = useState({});
    const [tempTheaterRoomObject, setTempTheaterRoomObject] = useState({});
    const [notFound, setNotFound] = useState();
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        
        axios.get(`http://localhost:3001/theaterrooms/byId/${id}`).then((response) => {
            setTheaterRoomObject(response.data);
            setTempTheaterRoomObject(response.data);
        });
    }, []);

    function updateTheaterRoomObject() {
        axios.put(`http://localhost:3001/theaterrooms/update/${id}`, tempTheaterRoomObject).then((response) => {
            navigate("/admin/theaterrooms");
        });
    }
    
    return (
        <div className='createPostPage'>
                {<div className='formContainer'>
                <label>Venue ID: </label>
                    <input type="text" id="inputCreatePost" name="venue_id" value = {tempTheaterRoomObject.venue_id}
                    onChange={(e) => {
                        setChanged(true);
                        setTempTheaterRoomObject({...tempTheaterRoomObject, venue_id: e.target.value})
                    }}/>

                    <label>Room Name: </label>
                    <input type="text" id="inputCreatePost" name="name" value = {tempTheaterRoomObject.name}
                    onChange={(e) => {
                        setChanged(true);
                        setTempTheaterRoomObject({...tempTheaterRoomObject, name: e.target.value})
                    }}/>

                    <label>Seat Capacity: </label>
                    <input type="text" id="inputCreatePost" name="seat_capacity" value = {tempTheaterRoomObject.seat_capacity}
                    onChange={(e) => {
                        setChanged(true);
                        setTempTheaterRoomObject({...tempTheaterRoomObject, seat_capacity: e.target.value})
                    }}/>
                        <>
                            <center><button
                                onClick={(e) => {
                                    setTempTheaterRoomObject({...theaterRoomObject});
                                    setChanged(false);
                                }}
                            >
                                Cancel
                            </button>{' '}</center>
                            
                            <center><button onClick={updateTheaterRoomObject}>Save</button></center>
                            </>
                    <center><button className="body" onClick={()=> navigate("../admin/theaterrooms")}>Back</button></center>
                </div> }
                
        </div>
    );
}
export default TheaterRoomId;