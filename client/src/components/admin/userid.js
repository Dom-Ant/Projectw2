import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserId() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [userObject, setUserObject] = useState({});
    const [tempUserObject, setTempUserObject] = useState({});
    const [notFound, setNotFound] = useState();
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        
        axios.get(`http://localhost:3001/users/byId/${id}`).then((response) => {
            setUserObject(response.data);
            setTempUserObject(response.data);
        });
    }, []);

    function updateUserObject() {
        axios.put(`http://localhost:3001/users/update/${id}`, tempUserObject).then((response) => {
            navigate("/admin/users");
        });
    }
    
    return (
        <div className='createPostPage'>
                {<div className='formContainer'>
                    <center><label>Username: </label></center>
                    <h3>{tempUserObject.username}</h3>
                    <h3></h3>
                    <center><label>Email: </label></center>
                    <h3>{tempUserObject.email}</h3>
                    <h3></h3>
                    <center><label>Role: </label></center>
                    <input type="text" id="inputCreatePost" name="role" value = {tempUserObject.role}
                    onChange={(e) => {
                        setChanged(true);
                        setTempUserObject({...tempUserObject, role: e.target.value})
                    }}/>
                        <>
                            <center><button
                                onClick={(e) => {
                                    setTempUserObject({...userObject});
                                    setChanged(false);
                                }}
                            >
                                Cancel
                            </button>{' '}</center>
                            
                            <center><button onClick={updateUserObject}>Save</button></center>
                            </>
                    <center><button className="body" onClick={()=> navigate("../admin/users")}>Back</button></center>
                </div> }
                
        </div>
    );
}
export default UserId;