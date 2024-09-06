const express = require('express');
const studentRoute = require('./routes/studentRoute');

const app = express();

// Initialize Passport

// Middleware
app.use(express.json());


// Routes

app.use('/v1/api/bai-tap', studentRoute);


module.exports = app;
