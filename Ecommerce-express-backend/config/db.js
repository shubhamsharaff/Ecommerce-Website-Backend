const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/your-database-name', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database!');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
};

module.exports = connectDB;