const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Crear carpeta uploads si no existe
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB límite
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, gif, webp)'));
    }
  }
});

// RUTAS

// GET - Obtener todas las experiencias
app.get('/api/experiencias', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM experiencias ORDER BY created_at DESC'
    );
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error al obtener experiencias:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener las experiencias'
    });
  }
});

// GET - Obtener una experiencia por ID
app.get('/api/experiencias/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM experiencias WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Experiencia no encontrada'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error al obtener experiencia:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener la experiencia'
    });
  }
});

// POST - Crear nueva experiencia
app.post('/api/experiencias', upload.single('foto'), async (req, res) => {
  try {
    const { nombre, departamento, experiencia } = req.body;

    // Validación
    if (!nombre || !departamento || !experiencia) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos: nombre, departamento y experiencia'
      });
    }

    const foto_url = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await pool.query(
      'INSERT INTO experiencias (nombre, departamento, experiencia, foto_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, departamento, experiencia, foto_url]
    );

    res.status(201).json({
      success: true,
      message: 'Experiencia compartida exitosamente',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error al crear experiencia:', error);
    res.status(500).json({
      success: false,
      message: 'Error al guardar la experiencia'
    });
  }
});

// DELETE - Eliminar una experiencia
app.delete('/api/experiencias/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Obtener la experiencia para eliminar la foto
    const experiencia = await pool.query(
      'SELECT foto_url FROM experiencias WHERE id = $1',
      [id]
    );

    if (experiencia.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Experiencia no encontrada'
      });
    }

    // Eliminar la foto del servidor si existe
    if (experiencia.rows[0].foto_url) {
      const fotoPath = path.join(__dirname, experiencia.rows[0].foto_url);
      if (fs.existsSync(fotoPath)) {
        fs.unlinkSync(fotoPath);
      }
    }

    // Eliminar de la base de datos
    await pool.query('DELETE FROM experiencias WHERE id = $1', [id]);

    res.json({
      success: true,
      message: 'Experiencia eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar experiencia:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la experiencia'
    });
  }
});

// GET - Obtener experiencias por departamento (para el mapa)
app.get('/api/experiencias/departamento/:departamento', async (req, res) => {
  try {
    const { departamento } = req.params;
    const result = await pool.query(
      'SELECT * FROM experiencias WHERE LOWER(departamento) LIKE LOWER($1) ORDER BY created_at DESC',
      [`%${departamento}%`]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error al buscar por departamento:', error);
    res.status(500).json({
      success: false,
      message: 'Error al buscar experiencias por departamento'
    });
  }
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: 'API Intercambio Nacional - Funcionando',
    endpoints: {
      'GET /api/experiencias': 'Obtener todas las experiencias',
      'GET /api/experiencias/:id': 'Obtener una experiencia por ID',
      'POST /api/experiencias': 'Crear nueva experiencia (con foto)',
      'DELETE /api/experiencias/:id': 'Eliminar experiencia',
      'GET /api/experiencias/departamento/:departamento': 'Buscar por departamento'
    }
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Error interno del servidor'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📁 Carpeta de uploads: ${uploadsDir}`);
});
