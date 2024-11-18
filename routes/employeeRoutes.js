const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authenticateToken = require('../middleware/auth');
const pool = require('../config/db'); // Asegúrate de importar la conexión a la base de datos

// Ruta para obtener todos los empleados
router.get('/empleados', authenticateToken, employeeController.getAllEmployees);

// Ruta para obtener un empleado por ID
router.get('/empleados/:id', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees WHERE employee_id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para eliminar un empleado por ID
router.delete('/empleados/:id', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM employees WHERE employee_id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    res.json({ message: 'Empleado eliminado', empleado: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para actualizar un empleado por ID
router.put('/empleados/:id', authenticateToken, async (req, res) => {
  const { first_name, last_name, position, salary } = req.body;
  try {
    const result = await pool.query(
      'UPDATE employees SET first_name = $1, last_name = $2, position = $3, salary = $4 WHERE employee_id = $5 RETURNING *',
      [first_name, last_name, position, salary, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    res.json({ message: 'Empleado actualizado', empleado: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

