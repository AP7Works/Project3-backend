const express = require('express'); 
const mongoose = require('mongoose');
const songRoutes = require('./routes/songRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Configure CORS to allow requests from your frontend
const allowedOrigins = ['https://project3-frontend-b44x.onrender.com'];
app.use(cors({
  origin: allowedOrigins,
}));

// MongoDB URI
const mongoURI = 'mongodb+srv://annaparaczky:AWYSjKrCIJJ4pMpP@cluster0.22msy.mongodb.net/musicapp?retryWrites=true&w=majority';

// Connect to MongoDB with updated options
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 60000,  // Set connection timeout to 60 seconds
    socketTimeoutMS: 60000,   // Set socket timeout to 60 seconds
    bufferCommands: false,    // Disable mongoose's buffering (optional but can help)
  })
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
