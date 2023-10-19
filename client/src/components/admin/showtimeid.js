import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ShowTimeId() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [showTimeObject, setShowTimeObject] = useState({});
    const [tempShowTimeObject, setTempShowTimeObject] = useState({});
    const [notFound, setNotFound] = useState();
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        
        axios.get(`http://localhost:3001/showtimes/byId/${id}`).then((response) => {
            setShowTimeObject(response.data);
            setTempShowTimeObject(response.data);
        });
    }, []);

    function updateShowTimeObject() {
        axios.put(`http://localhost:3001/showtimes/update/${id}`, tempShowTimeObject).then((response) => {
            navigate("/admin/showtimes");
        });
    }
    
    return (
        <div className='createPostPage'>
                {<div className='formContainer'>
                    <label>Movie ID: </label>
                    <input type="text" id="inputCreatePost" name="movie_id" value = {tempShowTimeObject.movie_id}
                    onChange={(e) => {
                        setChanged(true);
                        setTempShowTimeObject({...tempShowTimeObject, movie_id: e.target.value})
                    }}/>

                    <label>Room ID: </label>
                    <input type="text" id="inputCreatePost" name="room_id" value = {tempShowTimeObject.room_id}
                    onChange={(e) => {
                        setChanged(true);
                        setTempShowTimeObject({...tempShowTimeObject, room_id: e.target.value})
                    }}/>

                    <label>Show Date: </label>
                    <input type="text" id="inputCreatePost" name="show_date" value = {tempShowTimeObject.show_date}
                    onChange={(e) => {
                        setChanged(true);
                        setTempShowTimeObject({...tempShowTimeObject, show_date: e.target.value})
                    }}/>

                    <label>Show Time: </label>
                    <input type="text" id="inputCreatePost" name="show_time" value = {tempShowTimeObject.show_time}
                    onChange={(e) => {
                        setChanged(true);
                        setTempShowTimeObject({...tempShowTimeObject, show_time: e.target.value})
                    }}/>
                        <>
                            <center><button
                                onClick={(e) => {
                                    setTempShowTimeObject({...showTimeObject});
                                    setChanged(false);
                                }}
                            >
                                Cancel
                            </button>{' '}</center>
                            
                            <center><button onClick={updateShowTimeObject}>Save</button></center>
                            </>
                    <center><button className="body" onClick={()=> navigate("../admin/showtimes")}>Back</button></center>
                </div> }
                
        </div>
    );
}
export default ShowTimeId;