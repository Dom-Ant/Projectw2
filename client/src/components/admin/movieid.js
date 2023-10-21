import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function MovieId() {
    const { id } = useParams();
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
        const formData = new FormData();
        formData.append('poster', selectedFile);
        formData.append('title', tempMovieObject.title);
        formData.append('genre', tempMovieObject.genre);
        formData.append('duration', tempMovieObject.duration);
        formData.append('synopsis', tempMovieObject.synopsis);
    
        axios.put(`http://localhost:3001/movies/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            navigate("/admin/movies");
        });
    }
    

    return (
        <div className='createPostPage'>
            {<div className='formContainer'>
                <label>Title: </label>
                <input type="text" id="inputCreatePost" name="title" value={tempMovieObject.title}
                    onChange={(e) => {
                        setChanged(true);
                        setTempMovieObject({ ...tempMovieObject, title: e.target.value })
                    }} />

                <label>Genre: </label>
                <input type="text" id="inputCreatePost" name="genre" value={tempMovieObject.genre}
                    onChange={(e) => {
                        setChanged(true);
                        setTempMovieObject({ ...tempMovieObject, genre: e.target.value })
                    }} />

                <label>Duration: </label>
                <input type="text" id="inputCreatePost" name="duration" value={tempMovieObject.duration}
                    onChange={(e) => {
                        setChanged(true);
                        setTempMovieObject({ ...tempMovieObject, duration: e.target.value })
                    }} />

                <label>Poster: </label>
                <input type="file" id="posterInput" name="poster" accept="image/*" onChange={(e) => {
                    setChanged(true);
                    setSelectedFile(e.target.files[0]);
                }} />

                <label>Synopsis: </label>
                <input type="text" id="inputCreatePost" name="synopsis" value={tempMovieObject.synopsis}
                    onChange={(e) => {
                        setChanged(true);
                        setTempMovieObject({ ...tempMovieObject, synopsis: e.target.value })
                    }} />
                <>
                    <center><button
                        onClick={(e) => {
                            setTempMovieObject({ ...movieObject });
                            setChanged(false);
                        }}
                    >
                        Cancel
                    </button>{' '}</center>

                    <center><button onClick={updateMovieObject}>Save</button></center>
                </>
                <center><button className="body" onClick={() => navigate("../admin/movies")}>Back</button></center>
            </div>}

        </div>
    );
}
export default MovieId;