import React from "react";
export default function PhotoComment({ comments }) {
    console.log(comments[0]);
    return (<>
        {comments.map(comment => (
            <div key={comment._id}>
                <h4>From: {`${comment.user.first_name} ${comment.user.last_name}`}</h4>
                <p>{comment.comment}</p>
                <small>At: {comment.date_time}</small>
            </div>
        ))}
    </>);
}