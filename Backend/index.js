const express = require('express');
const app = express();
require('dotenv').config();
require('./Models/db');
const cors = require('cors');
const contactRoutes = require('./Routes/contactRoutes');
const authRoutes = require('./Routes/authRoutes.js'); // Explicitly specify .js extension
const postRoutes = require('./Routes/postRoutes');

const PORT = process.env.PORT || 8080;

// Debug logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Your React frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Debug route to test server
app.get('/ping', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Available routes:');
    console.log('- POST /api/auth/register');
    console.log('- POST /api/auth/login');
    console.log('- POST /api/contact/submit');
    console.log('- POST /api/posts/create');
    console.log('- GET /api/posts');
    console.log('- GET /api/posts/:id');
    console.log('- GET /api/posts/:id/image');
});