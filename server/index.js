const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});


io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


const broadcastPosts = async () => {
  const result = await pool.query('SELECT * FROM posts ORDER BY timestamp DESC');
  io.emit('postsUpdate', result.rows);
};


app.get('/posts', async (req, res) => {
  const { lat, lng, radius } = req.query;
  try {
    let query = 'SELECT *, ST_X(location::geometry) AS lng, ST_Y(location::geometry) AS lat FROM posts';
    let values = [];
    if (lat && lng && radius) {
      query += ' WHERE ST_DWithin(location, ST_MakePoint($1, $2)::geography, $3)';
      values = [lng, lat, radius];
    }
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/posts', async (req, res) => {
  const { content, lat, lng } = req.body;
  try {
    const location = `SRID=4326;POINT(${lng} ${lat})`;
    const result = await pool.query('INSERT INTO posts (content, location) VALUES ($1, ST_GeogFromText($2)) RETURNING *', [content, location]);
    const newPost = result.rows[0];
    broadcastPosts();
    res.json(newPost);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/posts/:id/upvote', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('UPDATE posts SET votes = votes + 1 WHERE id = $1', [id]);
    broadcastPosts();
    res.json({ success: true });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/posts/:id/downvote', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('UPDATE posts SET votes = votes - 1 WHERE id = $1', [id]);
    broadcastPosts();
    res.json({ success: true });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/posts/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const result = await pool.query('INSERT INTO comments (post_id, content) VALUES ($1, $2) RETURNING *', [id, content]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
