import React from 'react';
import Post from './Post';

function PostList({ posts }) {
  return (
    <div>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => <Post key={post.id} post={post} />)
      )}
    </div>
  );
}

export default PostList;
