import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function MovieId() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [movieObject, setMovieObject] = useState({});
    const [tempMovieObject, setTempMovieObject] = useState({});
    const [notFound, setNotFound] = useState();
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        
        axios.get(`http://localhost:3001/movies/byId/${id}`).then((response) => {
            setMovieObject(response.data);
            setTempMovieObject(response.data);
        });
    }, []);

    function updateMovieObject() {
        axios.put(`http://localhost:3001/movies/update/${id}`, tempMovieObject).then((response) => {
            navigate("/admin/movies");
        });
    }
    
    return (
        <div className='createPostPage'>
                {<div className='formContainer'>
                    <label>Title: </label>
                    <input type="text" id="inputCreatePost" name="title" value = {tempMovieObject.title}
                    onChange={(e) => {
                        setChanged(true);
                        setTempMovieObject({...tempMovieObject, title: e.target.value})
                    }}/>

                    <label>Genre: </label>
                    <input type="text" id="inputCreatePost" name="genre" value = {tempMovieObject.genre}
                    onChange={(e) => {
                        setChanged(true);
                        setTempMovieObject({...tempMovieObject, genre: e.target.value})
                    }}/>

                    <label>Duration: </label>
                    <input type="text" id="inputCreatePost" name="duration" value = {tempMovieObject.duration}
                    onChange={(e) => {
                        setChanged(true);
                        setTempMovieObject({...tempMovieObject, duration: e.target.value})
                    }}/>

                    <label>Poster URL: </label>
                    <input type="text" id="inputCreatePost" name="poster_url" value = {tempMovieObject.poster_url}
                    onChange={(e) => {
                        setChanged(true);
                        setTempMovieObject({...tempMovieObject, poster_url: e.target.value})
                    }}/>

                    <label>Synopsis: </label>
                    <input type="text" id="inputCreatePost" name="synopsis" value = {tempMovieObject.synopsis}
                    onChange={(e) => {
                        setChanged(true);
                        setTempMovieObject({...tempMovieObject, synopsis: e.target.value})
                    }}/>
                        <>
                            <center><button
                                onClick={(e) => {
                                    setTempMovieObject({...movieObject});
                                    setChanged(false);
                                }}
                            >
                                Cancel
                            </button>{' '}</center>
                            
                            <center><button onClick={updateMovieObject}>Save</button></center>
                            </>
                    <center><button className="body" onClick={()=> navigate("../admin/movies")}>Back</button></center>
                </div> }
                
        </div>
    );
}
export default MovieId;