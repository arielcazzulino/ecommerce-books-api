import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const addProducts = async (req, res) => {
  const { name, code, isbn, price, author, publisher, stock } = req.body;

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        code,
        isbn,
        price,
        author,
        publisher,
        stock,
      },
    });
    res.json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not create product' });
  }
};

export default addProducts;