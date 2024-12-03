const express = require('express');
const app = express();
require('dotenv').config();
require('./Models/db');
const cors = require('cors');
const contactRoutes = require('./Routes/contactRoutes');

const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);

app.get('/pin', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`));