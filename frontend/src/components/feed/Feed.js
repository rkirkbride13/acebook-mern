import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import PostForm from "../postForm/PostForm";

const Feed = ({ navigate }) => {
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
        <h2>Posts</h2>
        <button onClick={logout}>Logout</button>
        <div data-cy="feed" id="feed" role="feed">
          {posts.map((post) => <Post post={post} key={post._id} token={token} setToken={setToken} />).reverse()}
        </div>
        <PostForm setPosts={setPosts} token={token} setToken={setToken} />
      </>
    );
  } else {
    navigate("/login");
  }
};

export default Feed;
