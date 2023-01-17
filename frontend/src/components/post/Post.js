import React, {useState} from "react";
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
    message: PropTypes.string
  }

  const [commentsView, setCommentsView] = useState(false)

  const showComments = () => {
    setCommentsView(!commentsView)    
  }

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
      <div className="messageContainer">
      <div className="messageContent">
        <div className="postText">{post.message} </div>
        <div className="timestamp">{dateTimeAgo} </div>
        <span
        data-cy="deleteButton"
        className="material-symbols-outlined"
        onClick={handleClick}
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
