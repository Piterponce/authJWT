const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../config/db'); // Ajusta la ruta si es necesario
const router = express.Router();

// Ruta de login
router.post('/login', async (req, res) => {
  const { username, password } = req.body; // Obtenemos username y password del cuerpo de la solicitud

  try {
    // Buscar al usuario por username
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña en texto plano
    const user = result.rows[0];
    
    if (user.password !== password) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Generar un JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });

  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;

