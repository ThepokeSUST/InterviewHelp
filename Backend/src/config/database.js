const mongoose = require('mongoose');


function connectDB() {
  const dbURI = process.env.MONGO_URI;
  mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

module.exports = { connectDB };