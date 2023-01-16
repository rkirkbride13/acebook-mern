import React from 'react';
import PropTypes from 'prop-types';
import CommentForm from '../commentForm/CommentForm'

const Comments = ({token, setToken, post_id}) => {

  Comments.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func,
    post_id: PropTypes.string
  }

    return (
        <div>
            <div data-cy="comment">
                Comments here
            </div>
            <CommentForm token={token} setToken={setToken} post_id={post_id} />
        </div>
    )
}

export default Comments;