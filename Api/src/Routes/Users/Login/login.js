import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

    res.json({ message: "Successful login" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to login' });
  }
};

export default login;
