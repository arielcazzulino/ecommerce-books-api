import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const addProducts = async (req, res) => {
  const { name, code, isbn, price, author, publisher, stock } = req.body;

  if (!req.isAdmin) {
    console.log(req.isAdmin)
    return res.status(403).json({ error: "Unauthorized" }); // Verifica si el usuario es administrador
  }

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
