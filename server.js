const express = require('express');
const mongoose = require('mongoose');
const songRoutes = require('./routes/songRoutes');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

// Middleware to parse JSON
app.use(express.json());

app.use(cors());

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://annaparaczky:AWYSjKrCIJJ4pMpP@cluster0.22msy.mongodb.net/musicapp?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Connection error', error));

// Basic route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Music App API');
});

// Add '/api/songs' prefix to all songRoutes
app.use('/api/songs', songRoutes);

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
