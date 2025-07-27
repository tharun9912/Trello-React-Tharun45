// server.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

const key = process.env.VITE_KEY;
const token = process.env.VITE_TOKEN;

app.get('/boards', async (req, res) => {
  try {
    const response = await axios.get(`https://api.trello.com/1/members/me/boards?key=${key}&token=${token}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch boards' });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
