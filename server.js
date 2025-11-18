const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let contactos = [
  { id: 1, nombre: 'Juan', apellido: 'Pérez', telefono: '809-555-1234' },
  { id: 2, nombre: 'María', apellido: 'García', telefono: '809-555-5678' }
];

let nextId = 3;

app.get('/contactos', (req, res) => {
  res.json({
    success: true,
    data: contactos,
    total: contactos.length
  });
});

app.post('/contactos', (req, res) => {
  const { nombre, apellido, telefono } = req.body;

  if (!nombre || !apellido || !telefono) {
    return res.status(400).json({
      success: false,
      message: 'Todos los campos son requeridos: nombre, apellido, telefono'
    });
  }

  const nuevoContacto = {
    id: nextId++,
    nombre,
    apellido,
    telefono
  };

  contactos.push(nuevoContacto);

  res.status(201).json({
    success: true,
    message: 'Contacto agregado exitosamente',
    data: nuevoContacto
  });
});

app.get('/contactos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const contacto = contactos.find(c => c.id === id);

  if (!contacto) {
    return res.status(404).json({
      success: false,
      message: 'Contacto no encontrado'
    });
  }

  res.json({
    success: true,
    data: contacto
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'API de Agenda de Contactos',
    autor: 'Manuel Mella',
    matricula: '2024-1662',
    endpoints: {
      'GET /contactos': 'Listar todos los contactos',
      'POST /contactos': 'Agregar un nuevo contacto',
      'GET /contactos/:id': 'Obtener un contacto por ID'
    }
  });
});

app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
  console.log(` Tarea 5: Servicio Web - Manuel Mella (2024-1662)`);
});