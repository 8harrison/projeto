import { Request, Response } from 'express';
import statusCodes from '../../statusCode';
import OrderService from '../services/order.secrvice';

class OrderController {
  constructor(private orderService = new OrderService()) {
  }

  public getAll = async (req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    res.status(statusCodes.OK).json(orders);
  };
}

export default OrderController;