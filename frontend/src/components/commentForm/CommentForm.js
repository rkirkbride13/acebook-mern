import React, { useState } from "react";
import './CommentForm.css'

const CommentForm = () => {

    const [comment, setComment] = useState(null)

    // POST request to create Comment
    const handleClick = async (e) => {
        e.preventDefault()

        let response = await fetch("/comments", {
            method: 'post',
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ text: comment })
          })
    };
    // Changes the state to update the value of Comment
    const handleCommentChange = (e) => {
        setComment(e.target.value)
    };


    return (
        <div>
            <form>
                <label>Please Enter A Comment:</label>
                <textarea value={comment} onChange={handleCommentChange}></textarea>
                <button data-cy="submitButton" onClick={handleClick}>Add Comment</button>
            </form>
        </div>
    )
}

export default CommentForm;
