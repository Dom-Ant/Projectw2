import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserMovies.css';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

function UserMovies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await axios.get('http://localhost:3001/movies');
                setMovies(response.data);
            } catch (error) {
                console.error("Error fetching movies: ", error);
            }
        }

        fetchMovies();
    }, []);

    return (
        <>
            <Header />
            <div>
                <h2>Movies</h2>
                <div className="movieList">
                    {movies.map(movie => (
                        <div key={movie.id} className="movieCard">
                            <img src={movie.poster_thumbnail_url} alt={movie.title} />
                            <p>Genre: {movie.genre}</p>
                            <p>Duration: {movie.duration} minutes</p>
                            <button>
                                <Link to={`/movies/${movie.id}`}>Details</Link>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default UserMovies;