import React, { useState } from "react";

const PostForm = () => {
  const [postContent, setPostContent] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));

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
      // navigate("/login");
    } else {
      console.log("post added")
      window.localStorage.setItem("token", data.token)
      setToken(window.localStorage.getItem("token"))
      setPostContent("")
      // navigate("/posts")
      // window.localStorage.setItem("token", data.token);
    }
  };

  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Create a new post</label>
        <input id="postContent" type='text' value={ postContent } onChange={handlePostChange} />
        <button data-cy="submitButton" id="submitButton" type="submit" value="Submit">Create Post</button>
      </form>
    </div>
  );
};

export default PostForm;
