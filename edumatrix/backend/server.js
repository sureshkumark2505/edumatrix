require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
    origin: ['https://edumatrix.vercel.app', 'http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json());

// Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Root Endpoint
app.get('/', (req, res) => {
    res.send('EduMatrix AI Backend is running...');
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export for Vercel serverless functions
module.exports = app;
