import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import Comments from "../comment/Comments"

const Post = ({ post, token, setToken, post_id }) => {

  Post.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func,
    post_id: PropTypes.string,
    post: PropTypes.object,
    createdAt: PropTypes.string,
    _id: PropTypes.string,
    message: PropTypes.string
  }
  const dateTimeAgo = moment(new Date(post.createdAt)).fromNow();
  return (
    <article data-cy="post" key={post._id} className="post">
      <div>{post.message} </div>
      <div className="timestamp">{dateTimeAgo} </div>
      <Comments token={token} setToken={setToken} post_id={post_id}/>
    </article>
  );
};

export default Post;
