import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import PostForm from "../postForm/PostForm";
import PropTypes from 'prop-types';
import './Feed.css';

const Feed = ({ navigate }) => {

  Feed.propTypes = {
    navigate: PropTypes.func
  }
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      fetch("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setPosts(data.posts);
        });
    }
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  if (token) {
    return (
      <>
        <nav id="nav"> 
        <h1>AceBook</h1>      
        <h2>Posts</h2>
        <button onClick={logout}>Logout</button>
        </nav> 
        <PostForm setPosts={setPosts} token={token} setToken={setToken} />
        <div data-cy="feed" id="feed" role="feed">
          {posts.map((post) => <Post post={post} token={token} setToken={setToken} key={post._id} post_id={post._id} setPosts={setPosts}/>).reverse()}
        </div>
        
      </>
    );
  } else {
    navigate("/signin");
  }
};

export default Feed;
