import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

const Post = ({ post }) => {

  Post.propTypes = {
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
    </article>
  );
};

export default Post;
