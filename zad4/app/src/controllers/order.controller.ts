import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handlePrismaError = (error: any, res: Response) => {
  console.error('Prisma error:', error);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
};

const validatePhoneNumber = (phoneNumber: string, res: Response) => {
  if (!/^\d+$/.test(phoneNumber)) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: 'Phone number must contain only digits.' });
    return false;
  }
  return true;
};

const validateOrderStatusTransition = (existingOrder: any, newOrderStatus: string, res: Response) => {
  const allowedOrderStatuses = ['NIEZATWIERDZONE', 'ZATWIERDZONE', 'ANULOWANE', 'ZREALIZOWANE'];
  const existingOrderStatusIndex = allowedOrderStatuses.indexOf(existingOrder.orderStatus);
  const newOrderStatusIndex = allowedOrderStatuses.indexOf(newOrderStatus);

  if (newOrderStatusIndex < existingOrderStatusIndex || (existingOrderStatusIndex === 2 && newOrderStatusIndex !== 2)) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid status transition.' });
    return false;
  }
  return true;
};

const handleProductValidation = async (orderId: number, products: any, res: Response) => {
  const existingProducts = await prisma.product.findMany({
    where: { id: { in: products.map((product: any) => product.productId) } },
  });

  if (existingProducts.length !== products.length) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: 'Some products do not exist in the database.' });
    return false;
  }

  const isValidQuantity = products.every((product: { quantity: any }) => product.quantity > 0);

  if (!isValidQuantity) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: 'Product quantity must be a positive number.' });
    return false;
  }

  await prisma.productOrder.deleteMany({
    where: { orderId },
  });

  return true;
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({ include: { products: true } });
    res.status(StatusCodes.OK).json(orders);
  } catch (error) {
    handlePrismaError(error, res);
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.id, 10);

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { products: true },
    });

    if (order) {
      res.status(StatusCodes.OK).json(order);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Order not found' });
    }
  } catch (error) {
    handlePrismaError(error, res);
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const { userName, email, phoneNumber, orderStatus, products, approvalDate } = req.body;

  if (!userName || !email || !phoneNumber || !orderStatus || !products || products.length === 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid or missing input data.' });
  }

  if (!validatePhoneNumber(phoneNumber, res)) {
    return;
  }

  const allowedOrderStatuses = ['NIEZATWIERDZONE', 'ZATWIERDZONE', 'ANULOWANE', 'ZREALIZOWANE'];

  if (!allowedOrderStatuses.includes(orderStatus)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid or missing order status.' });
  }

  try {
    const isValidProduct = await handleProductValidation(0, products, res);

    if (!isValidProduct) {
      return;
    }

    const newOrder = await prisma.order.create({
      data: {
        userName,
        email,
        phoneNumber,
        orderStatus,
        approvalDate: approvalDate || null, 
        products: {
          create: products.map((product: { quantity: any; productId: any }) => {
            return {
              quantity: product.quantity,
              product: { connect: { id: product.productId } },
            };
          }).filter(Boolean),
        },
      },
      include: { products: true },
    });

    res.status(StatusCodes.CREATED).json(newOrder);
  } catch (error) {
    handlePrismaError(error, res);
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.id, 10);
  const { userName, email, phoneNumber, orderStatus, products, approvalDate } = req.body;

  try {
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
      include: { products: true },
    });

    if (!existingOrder) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Order not found.' });
    }

    if (userName) {
      existingOrder.userName = userName;
    }

    if (email) {
      existingOrder.email = email;
    }

    if (phoneNumber && !validatePhoneNumber(phoneNumber, res)) {
      return;
    }

    if (orderStatus) {
      if (!validateOrderStatusTransition(existingOrder, orderStatus, res)) {
        return;
      }
      existingOrder.orderStatus = orderStatus;
    }

    if (approvalDate !== undefined) {
      existingOrder.approvalDate = approvalDate || null;
    }

    if (products && products.length > 0) {
      if (!(await handleProductValidation(orderId, products, res))) {
        return;
      }

      await prisma.productOrder.deleteMany({
        where: { orderId },
      });

      await prisma.order.update({
        where: { id: orderId },
        data: {
          userName: existingOrder.userName,
          email: existingOrder.email,
          phoneNumber: existingOrder.phoneNumber,
          orderStatus: existingOrder.orderStatus,
          approvalDate: existingOrder.approvalDate,
          products: {
            create: products.map((product: { quantity: any; productId: any }) => {
              return {
                quantity: product.quantity,
                product: { connect: { id: product.productId } },
              };
            }),
          },
        },
      });
    }

    const updatedOrder = await prisma.order.findUnique({
      where: { id: orderId },
      include: { products: true },
    });

    res.status(StatusCodes.OK).json(updatedOrder);
  } catch (error) {
    handlePrismaError(error, res);
  }
};



export const getOrdersByStatus = async (req: Request, res: Response) => {
  const orderStatus = req.params.status;

  try {
    const orders = await prisma.order.findMany({
      where: { orderStatus },
      include: { products: true },
    });

    res.status(StatusCodes.OK).json(orders);
  } catch (error) {
    handlePrismaError(error, res);
  }
};
