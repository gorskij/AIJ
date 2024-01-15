import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

export const getAllOrderStatuses = async (req: Request, res: Response) => {
  try {
    const orderStatuses = await prisma.orderStatus.findMany();
    res.status(StatusCodes.OK).json(orderStatuses);
  } catch (error) {
    console.error('Prisma error:', error);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};