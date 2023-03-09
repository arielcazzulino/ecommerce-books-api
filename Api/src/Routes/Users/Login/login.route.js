import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const secretKey = 'my_secret_key';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si existe un usuario con el correo electrónico proporcionado
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Email not registered" });
    }

    // Verificar si la contraseña es correcta
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generar el token de autenticación
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.json({ message: "Successful login", token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to login' });
  }
};

export default login;
