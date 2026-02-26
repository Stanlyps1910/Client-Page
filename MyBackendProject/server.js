const express = require('express');
const connectDB = require('./db'); // Adjust if db.js is somewhere else
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.get('/', (req, res) => {
  res.send('Backend is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
