const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma').default;

const JWT_SECRET = process.env.JWT_SECRET;

// Registro
router.post('/register', async (req, res) => {
  try {
    // 1. Desestructurar los datos del cuerpo de la solicitud
    const { nombre, apellido, correo, contrasena, rol_id } = req.body;

    // 2. Combinar nombre y apellido en una nueva variable
    const nombre_completo = `${nombre} ${apellido}`;

    // 3. Determinar el rol basado en el rol_id
    let rol;
    if (rol_id === 1) {
      rol = 'Usuario';
    } else if (rol_id === 2) {
      rol = 'Agente';
    } else if (rol_id === 3) {
      rol = 'Administrador';
    } else {
      return res.status(400).json({ error: 'ID de rol inválido' });
    }

    // 4. Verificar si el correo ya existe
    const existe = await prisma.usuarios.findUnique({ where: { correo } });
    if (existe) {
      return res.status(400).json({ error: 'Correo ya registrado' });
    }

    // 5. Hashear la contraseña
    const hash = await bcrypt.hash(contrasena, 10);

    // 6. Crear el usuario en la base de datos con las variables corregidas
    const user = await prisma.usuarios.create({
      data: {
        nombre_completo,
        correo,
        contrasena_hash: hash,
        rol,
      }
    });

    // Respuesta exitosa
    res.json({ message: 'Usuario registrado', usuario_id: user.usuario_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en registro' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    const user = await prisma.usuarios.findUnique({ where: { correo } });
    if (!user) return res.status(400).json({ error: 'Credenciales inválidas' });

    const ok = await bcrypt.compare(contrasena, user.contrasena_hash);
    if (!ok) return res.status(400).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign(
      { usuario_id: user.usuario_id, rol: user.rol },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token, user: { usuario_id: user.usuario_id, nombre: user.nombre_completo, rol: user.rol } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en login' });
  }
});

module.exports = router;