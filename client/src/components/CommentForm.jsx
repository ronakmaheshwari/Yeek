import React, { useState } from 'react';

function CommentForm({ addComment }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      addComment(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment..."
        required
      />
      <button type="submit">Comment</button>
    </form>
  );
}

export default CommentForm;
