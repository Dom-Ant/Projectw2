import React from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext';

function Header() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    const userRole = currentUser?.role;

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
                {!currentUser && (
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

                {currentUser && (
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