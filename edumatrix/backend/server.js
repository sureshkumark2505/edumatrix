require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Root Endpoint
app.get('/', (req, res) => {
    res.send('EduMatrix AI Backend is running...');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
