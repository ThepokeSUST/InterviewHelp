const mongoose = require('mongoose');


function connectDB() {
  const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/firstgenai'; // Replace with your MongoDB connection string
  mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

module.exports = { connectDB };