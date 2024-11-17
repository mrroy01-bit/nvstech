const express = require('express');
const app = express();
require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;

app.get('/pin', (req, res) => {
    res.send('Hello World!');
});



app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`));