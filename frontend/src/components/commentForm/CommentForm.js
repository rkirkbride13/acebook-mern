import React, { useState } from "react";
import './CommentForm.css'
import PropTypes from 'prop-types'

const CommentForm = ({token, setToken, post_id}) => {

  CommentForm.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func,
    post_id: PropTypes.string
  }

    const [comment, setComment] = useState("")

    // POST request to create Comment
    const handleClick = async (e) => {
        e.preventDefault()

        let response = await fetch("/comments", {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ text: comment, post_id: post_id })
        })

        let data = await response.json()

        if (response.status !== 201) {
            console.log("comment NOT added")
        } else {
            console.log("comment added")
            window.localStorage.setItem("token", data.token)
            setToken(window.localStorage.getItem("token"))
            setComment("")
        }


    }
    // Changes the state to update the value of Comment
    const handleCommentChange = (e) => {
        setComment(e.target.value)
    };
    return (
        <div>
            <form>
                <label>Please Enter A Comment:</label>
                <textarea id="commentContent" value={comment} onChange={handleCommentChange}></textarea>
                <button data-cy="submitButton" id="submitButton" onClick={handleClick}>Add Comment</button>
            </form>
        </div>
    )
}

export default CommentForm;
