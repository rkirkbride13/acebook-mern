import React, { useState } from "react";
import './PostForm.css'
import PropTypes from 'prop-types'

const PostForm = ({ setPosts, token, setToken }) => {

  PostForm.propTypes = {
    setPosts: PropTypes.func,
    token: PropTypes.string,
    setToken: PropTypes.func,
  };

  const [postContent, setPostContent] = useState("");
  const user_id = window.localStorage.getItem('user_id')

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = await fetch("/posts", {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ message: postContent, user_id: user_id })
    })

    let data = await response.json()

    if (response.status !== 201) {
      console.log("post NOT added")

    } else {
      console.log("post added")
      window.localStorage.setItem("token", data.token)
      setToken(window.localStorage.getItem("token"))
      setPostContent("")

      // State passed from feed used to update all posts on Feed.js
      if (token) {
        fetch("/posts", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => response.json())
          .then(async data => {
            window.localStorage.setItem("token", data.token)
            setToken(window.localStorage.getItem("token"))
            setPosts(data.posts);
          })
      }
    }


  };
  //handler function to call POST method to create new Post
  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Create a new post</label>
        <textarea maxLength="175" placeholder="Write your post here..." id="postContent" type='text' value={postContent} onChange={handlePostChange} />
        <button data-cy="submitButton" id="submitButton" type="submit" value="Submit">Create Post</button>
      </form>
    </div>
  );
};

export default PostForm;
