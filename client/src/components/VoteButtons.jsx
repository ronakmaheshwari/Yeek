import React from 'react';

function VoteButtons({ postId, votes, handleVote }) {
  return (
    <div className="vote-buttons">
      <button onClick={() => handleVote(postId, 'upvote')}>▲</button>
      <span>{votes}</span>
      <button onClick={() => handleVote(postId, 'downvote')}>▼</button>
    </div>
  );
}

export default VoteButtons;
