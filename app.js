const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

// Middleware
app.use(express.json());

// Rutas
app.use('/api', employeeRoutes);

app.post('/login', (req, res) => {
    
    const user = { id: 1, username: 'admin' };
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h'
});
res.json({ token });
});

module.exports = app;