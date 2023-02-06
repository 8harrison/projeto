import express from 'express';

import ProductController from './controllers/Product.controller';
import UserController from './controllers/User.controller';

const productController = new ProductController();
const userController = new UserController();

const app = express();

app.use(express.json());

app.post('/products', productController.create);
app.post('/users', userController.create);

app.get('/products', productController.getAll);

export default app;
