const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON en el cuerpo de las solicitudes
app.use(express.json());

// Servir archivos estáticos (como index.html)
app.use(express.static(path.join(__dirname)));

// Importar rutas de autenticación
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Ruta para la raíz que sirva index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});