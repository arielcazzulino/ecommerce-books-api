import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updateUserInfo = async (req, res) => {
  try {
    const { userId } = req.params;
    const { address, profilePic } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { address, profilePic },
    });

    res.json({ user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update user info' });
  }
};

export default updateUserInfo;
