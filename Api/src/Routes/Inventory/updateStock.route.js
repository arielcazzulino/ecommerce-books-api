import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updateProductStock = async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  if (!req.isAdmin) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        stock: parseInt(stock),
      },
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not update product stock' });
  }
};

export default updateProductStock;
