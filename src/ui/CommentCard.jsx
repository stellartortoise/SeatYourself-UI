import React from 'react';
import { Link } from 'react-router-dom'

function CommentCard(props) {
  return (
    <>
        <div className="comment-card border p-3 mb-3 rounded">
            <h4>{props.Author}</h4>
            <p>{props.Body}</p>
            <small>Posted on: {new Date(props.CreatedAt).toLocaleString()}</small>
        </div>
    </>
  );
}

export default CommentCard;