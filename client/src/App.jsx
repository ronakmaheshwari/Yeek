import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import NewPostForm from './components/NewPostForm';
import PostList from './components/PostList';

const socket = io('http://localhost:5000');

function App() {
  const [posts, setPosts] = useState([]);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        (err) => setError(err.message)
      );
    }

    fetchPosts();

    socket.on('postsUpdate', (updatedPosts) => {
      setPosts(updatedPosts);
    });

    return () => {
      socket.off('postsUpdate');
    };
  }, [location]);

  const fetchPosts = async () => {
    if (location.lat && location.lng) {
      const response = await fetch(`http://localhost:5000/posts?lat=${location.lat}&lng=${location.lng}&radius=5000`);
      const data = await response.json();
      setPosts(data);
    }
  };

  const addPost = async (content) => {
    await fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, lat: location.lat, lng: location.lng })
    });
  };

  return (
    <div className="App">
      <h1>YEEK</h1>
      <NewPostForm addPost={addPost} />
      {error && <p>Error: {error}</p>}
      <PostList posts={posts} />
    </div>
  );
}

export default App;
