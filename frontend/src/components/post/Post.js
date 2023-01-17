import React, {useState} from "react";
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

  const [commentsView, setCommentsView] = useState(false)

  const showComments = () => {
    setCommentsView(!commentsView)    
  }

  const dateTimeAgo = moment(new Date(post.createdAt)).fromNow();
  return (
    <article data-cy="post" key={post._id} className="post">
      <div>{post.message} </div>
      <div className="timestamp">{dateTimeAgo} </div>
      <button onClick={showComments}>Comments</button>
      {commentsView && <div display="none"><Comments display={commentsView} token={token} setToken={setToken} post_id={post_id}/></div>}
    </article>
  );
};



export default Post;
