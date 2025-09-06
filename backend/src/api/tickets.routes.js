const express = require('express');
const router = express.Router();
const prisma = require('../config/prisma');

// Listar tickets
router.get("/", async (req, res) => {
  try {
    const tickets = await prisma.tickets.findMany({
      orderBy: { creado_en: "desc" },
    });
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo tickets" });
  }
});

// Crear ticket
router.post('/create', async (req, res) => {
  try {
    const { titulo, descripcion, creado_por } = req.body;
    if (!titulo || !descripcion || !creado_por) {
      return res.status(400).json({ error: 'Datos incompletos' });
    }

    const ticket = await prisma.tickets.create({
      data: {
        titulo,
        descripcion,
        creado_por
      }
    });

    res.json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creando ticket' });
  }
});

module.exports = router;