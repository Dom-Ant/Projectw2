import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import './UserMovies.css';

function MovieDetails() {
    const [movie, setMovie] = useState({});
    const { id } = useParams();
    const [showtimes, setShowtimes] = useState([]);
 
    useEffect(() => {
        async function fetchMovie() {
            try {
                const response = await axios.get(`http://localhost:3001/movies/byId/${id}`); 
                setMovie(response.data);
            } catch (error) {
                console.error("Error getting movie details:", error);
            }
        }

        async function fetchShowtimes() {
            try {
                const response = await axios.get(`http://localhost:3001/movies/${id}/showtimes`);
                setShowtimes(response.data);
            } catch (error) {
                console.error("Error getting showtimes:", error);
            }
        }

        fetchMovie();
        fetchShowtimes();
    }, [id]);

    return (
        <>
        <Header />
        <div className="movieDetailsContainer">
            <h2>{movie.title}</h2>
            <img src={movie.poster_url} alt={movie.title} className="img" />
            <p>{movie.synopsis}</p>
            <p>Genre: {movie.genre}</p>
            <p>Duration: {movie.duration} minutes</p>
            <h3>Showtimes</h3>
            <ul>
                {showtimes.map(showtime => (
                    <ul key={showtime.id} className="showtimeCard">
                        <p>Theatre Room: {showtime.room_id}</p>
                        <p>Show Date: {(showtime.show_date)}</p>
                        <p>Show Time: {(showtime.show_time)}</p>
                        <button>Buy Tickets</button>
                    </ul>
                ))}
            </ul>
        </div>
        </>
    );
}

export default MovieDetails;