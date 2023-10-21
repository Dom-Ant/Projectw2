import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Users from './components/admin/users';
import CreateUser from "./components/admin/createuser";
import Movies from './components/admin/movies';
import CreateMovie from "./components/admin/createmovie";
import Comments from './components/admin/comments';
import Tickets from './components/admin/tickets';
import CreateTicket from "./components/admin/createticket";
import ShowTimes from './components/admin/showTimes';
import CreateShowtime from "./components/admin/createshowtime";
import TheaterRooms from './components/admin/theaterRooms';
import CreateTheaterRoom from "./components/admin/createtheaterroom";
import Userid from './components/admin/userid';
import Movieid from './components/admin/movieid';
import Commentid from './components/admin/commentid';
import Ticketid from './components/admin/ticketid';
import Showtimeid from './components/admin/showtimeid';
import Theaterroomid from './components/admin/theaterroomid';
import Home from "./components/admin/Home";
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegisterPage';
import UserMovies from './pages/UserMovies';
import MovieDetails from './pages/MovieDetails';
import { useAuth } from './authContext';

/* function useUserRole() {
    const token = getStoredToken();
    const decodeToken = token ? jwtDecode(token) : null; // decode JWT if exists
    return decodeToken ? decodeToken.role : null; // check if decodeToken exists or return null
} */

// function useUserId() {
//     const token = getStoredToken();
//     const userId = token ? jwtDecode(token) : null;
//     return userId ? userId.id : null; // check if decodeToken exists or return null
// }

function AdminNavbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { setCurrentUser } = useAuth();

    if (!location.pathname.startsWith('/admin')) {
        return null;
    }

    const handleLogout = () => {
        // Remove the JWT from storage
        localStorage.removeItem('token');
        setCurrentUser(null);
        navigate('/login');
    }

    return (
        <div className='navbar'>
            <Link className="navbarbtn" to = "/admin/users">Users</Link>
            <Link className="navbarbtn" to = "/admin/movies">Movies</Link>
            <Link className="navbarbtn" to = "/admin/comments">Comments</Link>
            <Link className="navbarbtn" to = "/admin/tickets">Tickets</Link>
            <Link className="navbarbtn" to = "/admin/showtimes">Show Times</Link>
            <Link className="navbarbtn" to = "/admin/theaterrooms">Theater Rooms</Link>
            <Link className="navbarbtn" to = "/admin">Home</Link>
            <button className="logoutbtn" onClick={handleLogout}>Logout</button>
        </div>
    );
}

/* function getStoredToken() {
    return localStorage.getItem('token');
}
 */
function App() {
    const { currentUser } = useAuth();
    const userRole = currentUser ? currentUser.role : null;
    /* const userRole = useUserRole(); */
    // const userId = useUserId();

    return (
        <div className="App">
            <Router>
                <AdminNavbar />
                <Routes>
                    {/* <Route path="/admin/users" exact Component = {Users} />
                    <Route path="/admin/movies" exact Component = {Movies} />
                    <Route path="/admin/comments" exact Component = {Comments} />
                    <Route path="/admin/tickets" exact Component = {Tickets} />
                    <Route path="/admin/showTimes" exact Component = {ShowTimes} />
                    <Route path="/admin/theaterRooms" exact Component = {TheaterRooms} />
                    <Route path="/admin/users/createuser" exact Component = {createuser} />
                    <Route path="/admin/movies/createmovie" exact Component = {createmovie} />
                    <Route path="/admin/theaterRooms/createtheaterroom" exact Component = {createtheaterroom} />
                    <Route path="/admin/showtimes/createshowtime" exact Component = {createshowtime} />
                    <Route path="/admin/tickets/createticket" exact Component = {createticket} />
                    <Route path="/admin/user/:id" exact Component = {userid} />
                    <Route path="/admin" exact Component = {home} /> */}
                    {/* <Route path="/" exact Component = {LoginPage} /> */}

                    {/* Protect the admin paths */}
                    <Route path="/admin" element={(userRole === 'Admin' || userRole === 'Manager') ? <Home /> : <Navigate to="/" />} />
                    <Route path="/admin/:id" element={(userRole === 'Admin' || userRole === 'Manager') ? <Home /> : <Navigate to="/" />} />
                    <Route path="/admin/users" element={(userRole === 'Admin' || userRole === 'Manager') ? <Users /> : <Navigate to="/" />} />
                    <Route path="/admin/movies" element={(userRole === 'Admin' || userRole === 'Manager') ? <Movies /> : <Navigate to="/" />} />
                    <Route path="/admin/comments" element={(userRole === 'Admin' || userRole === 'Manager') ? <Comments /> : <Navigate to="/" />} />
                    <Route path="/admin/tickets" element={(userRole === 'Admin' || userRole === 'Manager') ? <Tickets /> : <Navigate to="/" />} />
                    <Route path="/admin/showTimes" element={(userRole === 'Admin' || userRole === 'Manager') ? <ShowTimes /> : <Navigate to="/" />} />
                    <Route path="/admin/theaterRooms" element={(userRole === 'Admin' || userRole === 'Manager') ? <TheaterRooms /> : <Navigate to="/" />} />
                    <Route path="/admin/users/createuser" element={(userRole === 'Admin' || userRole === 'Manager') ? <CreateUser /> : <Navigate to="/" />} />
                    <Route path="/admin/movies/createmovie" element={(userRole === 'Admin' || userRole === 'Manager') ? <CreateMovie /> : <Navigate to="/" />} />
                    <Route path="/admin/theaterRooms/createtheaterroom" element={(userRole === 'Admin' || userRole === 'Manager') ? <CreateTheaterRoom /> : <Navigate to="/" />} />
                    <Route path="/admin/showtimes/createshowtime" element={(userRole === 'Admin' || userRole === 'Manager') ? <CreateShowtime /> : <Navigate to="/" />} />
                    <Route path="/admin/tickets/createticket" element={(userRole === 'Admin' || userRole === 'Manager') ? <CreateTicket /> : <Navigate to="/" />} />
                    <Route path="/admin/user/:id" element={(userRole === 'Admin' || userRole === 'Manager') ? <Userid /> : <Navigate to="/" />} />
                    <Route path="/admin/movie/:id" element={(userRole === 'Admin' || userRole === 'Manager') ? <Movieid /> : <Navigate to="/" />} />
                    <Route path="/admin/comment/:id" element={(userRole === 'Admin' || userRole === 'Manager') ? <Commentid /> : <Navigate to="/" />} />
                    <Route path="/admin/ticket/:id" element={(userRole === 'Admin' || userRole === 'Manager') ? <Ticketid /> : <Navigate to="/" />} />
                    <Route path="/admin/showtime/:id" element={(userRole === 'Admin' || userRole === 'Manager') ? <Showtimeid /> : <Navigate to="/" />} />
                    <Route path="/admin/theaterroom/:id" element={(userRole === 'Admin' || userRole === 'Manager') ? <Theaterroomid /> : <Navigate to="/" />} />

                    {/* Paths accessible to all */}
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/movies" element={<UserMovies />} />
                    <Route path="/movies/:id" element={<MovieDetails />} />
                    
                </Routes>
            </Router>
            </div>
    );

    /* return (
        <div className="App">
            <Router>
                <div className='navbar'>
                    <Link to = "/admin/users">Users</Link>
                    <Link to = "/admin/movies">Movies</Link>
                    <Link to = "/admin/comments">Comments</Link>
                    <Link to = "/admin/tickets">Tickets</Link>
                    <Link to = "/admin/showtimes">Show Times</Link>
                    <Link to = "/admin/theaterrooms">Theater Rooms</Link>
                    <Link to = "/admin">Home</Link>
                </div>
                    <Routes>
                        <Route path="/admin/users" exact Component = {Users} />
                        <Route path="/admin/movies" exact Component = {Movies} />
                        <Route path="/admin/comments" exact Component = {Comments} />
                        <Route path="/admin/tickets" exact Component = {Tickets} />
                        <Route path="/admin/showTimes" exact Component = {ShowTimes} />
                        <Route path="/admin/theaterRooms" exact Component = {TheaterRooms} />
                        <Route path="/admin/users/createuser" exact Component = {createuser} />
                        <Route path="/admin/movies/createmovie" exact Component = {createmovie} />
                        <Route path="/admin/theaterRooms/createtheaterroom" exact Component = {createtheaterroom} />
                        <Route path="/admin/showtimes/createshowtime" exact Component = {createshowtime} />
                        <Route path="/admin/tickets/createticket" exact Component = {createticket} />
                        <Route path="/admin/user/:id" exact Component = {userid} />
                        <Route path="/admin" exact Component = {home} />
                        <Route path="/" exact Component = {LoginPage} />
                        <Route path="/login" exact Component = {LoginPage} />
                        <Route path="/register" exact Component = {RegistrationPage} /> 
                    </Routes>
            </Router>
            </div>
    ); */
}

export default App;
