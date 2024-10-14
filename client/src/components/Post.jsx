import React, { useState } from 'react';

function Post({ post }) {
  const [comments, setComments] = useState([]);

  const handleVote = async (type) => {
    await fetch(`http://localhost:5000/posts/${post.id}/${type}`, {
      method: 'POST'
    });
  };

  const addComment = async (content) => {
    const response = await fetch(`http://localhost:5000/posts/${post.id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
    const newComment = await response.json();
    setComments([...comments, newComment]);
  };

  return (
    <div className="post">
      <p>{post.content}</p>
      <div className="votes">
        <button onClick={() => handleVote('upvote')}>▲</button>
        <span>{post.votes}</span>
        <button onClick={() => handleVote('downvote')}>▼</button>
      </div>
      <div className="comments">
        {comments.map((comment) => (
          <p key={comment.id}>{comment.content}</p>
        ))}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const content = e.target.elements.comment.value;
            if (content) {
              addComment(content);
              e.target.reset();
            }
          }}
        >
          <input name="comment" type="text" placeholder="Add a comment..." />
          <button type="submit">Comment</button>
        </form>
      </div>
    </div>
  );
}

export default Post;
