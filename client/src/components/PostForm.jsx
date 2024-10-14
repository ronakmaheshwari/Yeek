import React, { useState } from 'react';

function PostForm({ addPost }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      addPost(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your post..."
        required
      />
      <button type="submit">Post</button>
    </form>
  );
}

export default PostForm;
