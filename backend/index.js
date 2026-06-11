require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRoute = require('./routes/usersroute');
const expensesRoute = require('./routes/expensesroute');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/users', usersRoute);
app.use('/expenses', expensesRoute);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.log('DB Connection Error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});