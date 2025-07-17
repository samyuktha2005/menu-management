const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect({
      protocol: 'mongodb+srv',
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      dbName: process.env.DB_NAME,
      options: {
        retryWrites: true,
        w: 'majority',
        appName: 'Cluster0'
      }
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;