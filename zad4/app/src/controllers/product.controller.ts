import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

const handlePrismaError = (error: any, res: Response) => {
  console.error('Prisma error:', error);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
};

const validateProductInput = (name: string, description: string, price: number, weight: number, res: Response) => {
  if (price <= 0) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: 'Price must be greater than zero.' });
    return false;
  }

  if (weight <= 0) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: 'Weight must be greater than zero.' });
    return false;
  }

  if (name.trim() === '' || description.trim() === '') {
    res.status(StatusCodes.BAD_REQUEST).json({ error: 'Product name and description cannot be empty.' });
    return false;
  }

  return true;
};

const validateCategory = async (categoryId: number, res: Response) => {
  const existingCategory = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!existingCategory) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: 'Category does not exist.' });
    return false;
  }

  return true;
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
    });
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    handlePrismaError(error, res);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id, 10);

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { category: true },
    });

    if (product) {
      res.status(StatusCodes.OK).json(product);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Product not found' });
    }
  } catch (error) {
    handlePrismaError(error, res);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, weight, categoryId } = req.body;

  if (!validateProductInput(name, description, price, weight, res)) {
    return;
  }

  try {
    if (!(await validateCategory(categoryId, res))) {
      return;
    }

    const newProduct = await prisma.product.create({
      data: { name, description, price, weight, categoryId },
    });

    res.status(StatusCodes.CREATED).json(newProduct);
  } catch (error) {
    handlePrismaError(error, res);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id, 10);
  const { name, description, price, weight, categoryId } = req.body;

  if (!validateProductInput(name, description, price, weight, res)) {
    return;
  }

  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Product not found' });
    }

    if (!(await validateCategory(categoryId, res))) {
      return;
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { name, description, price, weight, categoryId },
    });

    res.status(StatusCodes.OK).json(updatedProduct);
  } catch (error) {
    handlePrismaError(error, res);
  }
};
