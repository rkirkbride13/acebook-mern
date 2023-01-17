import React, { useState } from "react";
import moment from "moment";

const Post = ({ post, token, setToken }) => {
  const dateTimeAgo = moment(new Date(post.createdAt)).fromNow();
  const [likes, setLikes] = useState(post.likes.length);
  const user_id = window.localStorage.getItem('user_id')
  const post_id = post._id

  const handleClick = async (e) => {
    e.preventDefault();

    let response = await fetch(`/posts/${post._id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
        'X-Test': "Test input"
      },
      body: JSON.stringify({user_id: user_id})
    })

    let data = await response.json()
  
    if (response.status !== 200) {
      console.log("likes not updated")

    } else {
      console.log("likes updated")
      window.localStorage.setItem("token", data.token)
      setToken(window.localStorage.getItem("token"))

      // State passed from feed used to update post
      if (token) {
        fetch(`/posts`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => response.json())
          .then(async data => {
            window.localStorage.setItem("token", data.token)
            setToken(window.localStorage.getItem("token"))
            data.posts.map((post) => {
              if (post._id === post_id) {
                setLikes(post.likes.length)
              }
            })
          }
        )
      }
    }
  };
  
  return (
    <article data-cy="post" key={post._id} className="post">
      <div>{post.message}</div>
      <div>
        <span className="material-symbols-outlined" data-cy="likeButton" id="likeButton" onClick={handleClick}>heart_plus</span> {likes}
      </div>
      <div className="timestamp">{dateTimeAgo} </div>
    </article>
  );
};

export default Post;
