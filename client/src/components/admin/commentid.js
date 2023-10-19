import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CommentId() {
    let Navigate = useNavigate();
    let {id} = useParams();
    const [commentObject, setCommentObject] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3001/comments/byId/${id}`).then((response) => {
            setCommentObject(response.data);
        });
    }, []);

    return (
        <div className="post" id="individual">
            <div className="title">User Id: {commentObject.user_id}</div>
            <div className="body">Movie Id: {commentObject.movie_id}</div>
            <div className="title">{commentObject.comment_text}</div>
            <center><button  className="body" onClick={()=> Navigate("../admin/comments")}>Back</button></center>
        </div>
);
}
export default CommentId;