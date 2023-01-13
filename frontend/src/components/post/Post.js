import React from "react";
import moment from "moment";

const Post = ({ post }) => {
  const dateTimeAgo = moment(new Date(post.createdAt)).fromNow();
  return (
    <article data-cy="post" key={post._id} className="post">
      <div>{post.message} </div>
      <div className="timestamp">{dateTimeAgo} </div>
    </article>
  );
};

export default Post;
