require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importar rutas
const authRoutes = require('./api/auth.routes');
const ticketRoutes = require('./api/tickets.routes');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ SysTickets backend escuchando en puerto ${PORT}`);
});
