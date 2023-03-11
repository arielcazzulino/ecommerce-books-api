import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    // Verificar si ya existe un usuario con el mismo correo electrónico
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    
    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Guardar usuario en la base de datos
    const user = await prisma.user.create({
      data: {
        name,
        isAdmin,
        email,
        password: hashedPassword
      }
    });

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to register user' });
  }
};

export default register;