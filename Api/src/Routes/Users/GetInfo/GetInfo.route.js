import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getUserInfo = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: { name: true, email: true, address: true, profilePic: true },
    });

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get user info' });
  }
};

export default getUserInfo;
