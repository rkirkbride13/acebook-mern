import React, { useState } from "react";
import moment from "moment";

const Post = ({ post, token, setToken }) => {
  const dateTimeAgo = moment(new Date(post.createdAt)).fromNow();
  const [likes, setLikes] = useState("");
  const user_id = window.localStorage.getItem('user_id')
  console.log(user_id)

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = await fetch(`/posts/${post._id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({user_id: user_id})
    })

    let data = await response.json()
  
    console.log(data)
    if (response.status !== 200) {
      console.log("likes not updated")

    } else {
      console.log("likes updated")
      window.localStorage.setItem("token", data.token)
      setToken(window.localStorage.getItem("token"))

      // State passed from feed used to update post
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
            setLikes(data.posts.likes);
          })
      }
    }
  };
  
  return (
    <article data-cy="post" key={post._id} className="post">
      <div>{post.message}</div>
      <div>
        <form onSubmit={handleSubmit}>
          <button data-cy="likeButton" id="likeButton" type="submit" value="Submit">like</button> {post.likes.length}
        </form>
      </div>
      <div className="timestamp">{dateTimeAgo} </div>
    </article>
  );
};

export default Post;
