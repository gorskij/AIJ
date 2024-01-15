import express from 'express';
import * as CategoryController from './controllers/category.controller';
import * as ProductController from './controllers/product.controller';
import * as OrderController from './controllers/order.controller';
import * as OrderStatusController from './controllers/order-status.controller';

const router = express.Router();

router.get('/categories', CategoryController.getAllCategories);

router.get('/products', ProductController.getAllProducts);
router.get('/products/:id', ProductController.getProductById);
router.post('/products', ProductController.createProduct);
router.put('/products/:id', ProductController.updateProduct);

router.get('/status', OrderStatusController.getAllOrderStatuses);

router.get('/orders', OrderController.getAllOrders);
router.get('/orders/:id', OrderController.getOrderById);
router.post('/orders', OrderController.createOrder);
router.put('/orders/:id', OrderController.updateOrder);
router.get('/orders/status/:status', OrderController.getOrdersByStatus);


export default router;