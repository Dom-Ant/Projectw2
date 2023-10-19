import React from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

// extract the role from the token and return it
function useUserRole() {
    const token = getStoredToken();
    const decodeToken = token ? jwtDecode(token) : null;
    return decodeToken ? decodeToken.role : null;
}

function getStoredToken() {
    return localStorage.getItem('token');
}

function Header() {
    const navigate = useNavigate();
    const userRole = useUserRole();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <>
        <header className="header">
            <div className="header-logo">
                <img src="/path-to-logo.svg" alt="5StarCinema Logo" />
            </div>
            <div className="header-right">
                <button>
                    <Link to="/movies">Movies</Link>
                </button>
                <button>My Tickets</button>

                {/* conditional rendering (render only if true) */}
                {!getStoredToken() && (
                    <>
                    <button>
                        <Link to="/login">Login</Link>
                    </button>
                    <button>
                        <Link to="/register">Register</Link>
                    </button>
                    </>
                )}

                {(userRole === 'Admin' || userRole === 'Manager') && (
                    <button>
                        <Link to="/admin">Admin Panel</Link>
                    </button>
                )}

                {getStoredToken() && (
                    <>
                    <button>My Profile</button>
                    <button onClick={handleLogout}>Logout</button>
                    </>
                )}

                {/* <button>
                    <Link to="/login">Login</Link>
                </button>
                <button>
                    <Link to="/register">Register</Link>
                </button>
                <button>
                    <Link to="/admin">Admin Panel</Link>
                </button> */}
            </div>
        </header>
        </>
    );
}

export default Header;