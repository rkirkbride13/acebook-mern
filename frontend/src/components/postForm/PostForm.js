import React, { useState } from "react";

const PostForm = ({navigate}) => {
  const [postContent, setPostContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = await fetch("/posts", {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: postContent })
    })
    
    if (response.status !== 201) {
      navigate("/login");
    } else {
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      navigate("/posts");
    }
  };

  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Create a new post</label>
        <input onChange={handlePostChange} id="postContent"></input>
        <button
          type="submit"
          value="Submit"
          data-cy="submitButton"
          id="submitButton"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
