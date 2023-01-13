import React, { useState } from "react";
import './PostForm.css'

const PostForm = ({ setPosts, token, setToken }) => {
  const [postContent, setPostContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = await fetch("/posts", {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ message: postContent })
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
        <textarea maxLength="175" placeHolder="Write your post here..." id="postContent" type='text' value={postContent} onChange={handlePostChange} />
        <button data-cy="submitButton" id="submitButton" type="submit" value="Submit">Create Post</button>
      </form>
    </div>
  );
};

export default PostForm;
