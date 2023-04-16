const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Global variables
const PORT = 3500;

// Connect to db
connectDB();

// Middleware for cookies
app.use(cookieParser());

// Built-in middleware for json
app.use(express.json());

// Routes
app.use('/task', require("./routes/taskRoute"));

// Listen ports
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});