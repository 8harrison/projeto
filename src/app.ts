import express from 'express';
import LoginController from './controllers/Login.controller';
import OrderController from './controllers/Order.controller';

import ProductController from './controllers/Product.controller';
import UserController from './controllers/User.controller';

const productController = new ProductController();
const userController = new UserController();
const orderController = new OrderController();
const loginController = new LoginController();

const app = express();

app.use(express.json());

app.post('/products', productController.create);
app.post('/users', userController.create);
app.post('/login', loginController.create);

app.get('/products', productController.getAll);
app.get('/orders', orderController.getAll);

export default app;
