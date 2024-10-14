import React from 'react';

function CommentList({ comments }) {
  return (
    <div className="comment-list">
      {comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((comment, index) => <p key={index}>{comment}</p>)
      )}
    </div>
  );
}

export default CommentList;
