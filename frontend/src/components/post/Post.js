import React, { useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import Comments from "../comment/Comments"

const Post = ({ post, token, setToken, post_id, setPosts }) => {

  Post.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func,
    post_id: PropTypes.string,
    post: PropTypes.object,
    createdAt: PropTypes.string,
    _id: PropTypes.string,
    message: PropTypes.string,
    setPosts: PropTypes.func,
  }

  const [commentsView, setCommentsView] = useState(false)

  const showComments = () => {
    setCommentsView(!commentsView)    
  }

  const dateTimeAgo = moment(new Date(post.createdAt)).fromNow();
  const [likes, setLikes] = useState(post.likes.length);
  const user_id = window.localStorage.getItem('user_id')
  const isPostLiked = post.likes.includes(user_id);
  const [liked, setLiked] = useState(isPostLiked);

  const likePost = async (e) => {
    e.preventDefault();

    // A true/false toggle on whether the user has liked the post already
    setLiked((state) => !state);

    let response = await fetch(`/posts/${post._id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({user_id: user_id, liked})
    })

    let data = await response.json()
  
    if (response.status !== 200) {
      console.log("likes not updated")

    } else {
      console.log("likes updated")
      window.localStorage.setItem("token", data.token)
      setToken(window.localStorage.getItem("token"))

      // State passed from feed used to update number of likes on post
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

  // The delete the post with POST_ID
  const deletePost = async () => {
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
      <div className="messageContainer">
      <div className="messageContent">
        <div className="postText">{post.message} </div>
        <div className="likeButton">
          <span className="material-symbols-outlined" data-cy="likeButton" id="likeButton" onClick={likePost}>heart_plus</span> {likes}
        </div>
        <div className="timestamp">{dateTimeAgo} </div>
        <span
        data-cy="deleteButton"
        className="material-symbols-outlined"
        onClick={deletePost}
        >
        delete
      </span>
      </div>
      <button className="commentButton" onClick={showComments}>Comments</button>
      </div>
      {commentsView && <div display="none"><Comments display={commentsView} token={token} setToken={setToken} post_id={post_id}/></div>}
    </article>
  );
};



export default Post;
