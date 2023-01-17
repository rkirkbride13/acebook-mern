import React from "react";
import moment from "moment";

const Post = ({ post, setPosts, token, setToken }) => {
  const dateTimeAgo = moment(new Date(post.createdAt)).fromNow();

  // The delete the post with POST_ID
  const handleClick = async () => {
    const response = await fetch("/posts", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Post_ID: post._id,
      },
    });

    const data = await response.json();

    if (response.status !== 200) {
      console.log("post NOT deleted");
    } else {
      console.log("post deleted");
      window.localStorage.setItem("token", data.token);
      setToken(window.localStorage.getItem("token"));

      // State passed from feed used to update all posts on Feed.js
      // This refreshes post list after deletion
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
    }
  };

  return (
    <article data-cy="post" key={post._id} className="post">
      <div>{post.message} </div>
      <div className="timestamp">{dateTimeAgo} </div>
      <span
        data-cy="deleteButton"
        className="material-symbols-outlined"
        onClick={handleClick}
      >
        delete
      </span>
    </article>
  );
};

export default Post;
