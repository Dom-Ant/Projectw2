import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../authContext';

function Home() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [adminObject, setAdminObject] = useState({});

  useEffect(() => {
    if (currentUser && currentUser.id) {
      axios.get(`http://localhost:3001/users/byId/${currentUser.id}`).then((response) => {
        setAdminObject(response.data);
      });
    }
  }, [currentUser]);
  return (
    <center>
    <h1>My Profile</h1>
    
    {adminObject && (
        <>
        <div className='formContainer'>
        <label>Username: </label>
        <h1>{adminObject.username}</h1></div><br></br>
        <div className='formContainer'>
        <label>Email: </label>
        <h1>{adminObject.email}</h1></div><br></br>
        <div className='formContainer'>
        <label>Role: </label>
        <h1>{adminObject.role}</h1></div>
        </>
    )}
</center>
  );
}

export default Home;