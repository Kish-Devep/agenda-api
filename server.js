const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const API_URL = 'http://www.raydelto.org/agenda.php';

app.get('/contactos', async (req, res) => {
  try {
    console.log(' Obteniendo contactos de la API de raydelto...');
    
    const response = await fetch(API_URL);
    const contactos = await response.json();

    res.json({
      success: true,
      message: 'Contactos obtenidos exitosamente',
      data: contactos,
      total: contactos.length,
      fuente: 'http://www.raydelto.org/agenda.php'
    });

    console.log(` ${contactos.length} contactos enviados`);
  } catch (error) {
    console.error(' Error al obtener contactos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener contactos de la API',
      error: error.message
    });
  }
});


app.post('/contactos', async (req, res) => {
  try {
    const { nombre, apellido, telefono } = req.body;

    if (!nombre || !apellido || !telefono) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos: nombre, apellido, telefono'
      });
    }

    console.log(' Enviando nuevo contacto a la API de raydelto...');
    console.log('Datos:', { nombre, apellido, telefono });


    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, apellido, telefono })
    });

    const resultado = await response.json();

    res.status(201).json({
      success: true,
      message: 'Contacto agregado exitosamente',
      data: { nombre, apellido, telefono },
      respuesta_api: resultado
    });

    console.log(' Contacto agregado exitosamente');
  } catch (error) {
    console.error(' Error al agregar contacto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al agregar contacto a la API',
      error: error.message
    });
  }
});


app.get('/', (req, res) => {
  res.json({
    message: 'API Intermediaria de Agenda de Contactos',
    autor: 'Manuel Mella',
    matricula: '2024-1662',
    descripcion: 'Servicio Web que consume http://www.raydelto.org/agenda.php',
    endpoints: {
      'GET /contactos': 'Listar todos los contactos desde la API de raydelto',
      'POST /contactos': 'Agregar un nuevo contacto a la API de raydelto'
    },
    uso: {
      listar: 'GET http://localhost:3000/contactos',
      agregar: 'POST http://localhost:3000/contactos con body JSON'
    }
  });
});


app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
  console.log(` Tarea 5: Servicio Web - Manuel Mella (2024-1662)`);
  console.log(` Conectando con: ${API_URL}`);
});