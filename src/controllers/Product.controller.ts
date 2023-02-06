import { Request, Response } from 'express';
import statusCodes from '../../statusCode';
// import Product from '../interfaces/product.interface';
import ProductService from '../services/products.service';

class ProductController {
  constructor(private productService = new ProductService()) {

  }

  public create = async (req: Request, res: Response) => {
    const product = req.body;
    
    const productCreated = await this.productService.create(product);
    res.status(statusCodes.CREATED).json(productCreated);
  };

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.productService.getAll();
    res.status(statusCodes.OK).json(products);
  };
}

export default ProductController;