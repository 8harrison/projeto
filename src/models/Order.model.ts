import { Pool } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const select = 'SELECT o.id, o.user_id as userId,json_ArrayAgg(p.id) AS "productsIds"';
    const from = 'FROM Trybesmith.orders as o';
    const innerJoin = 'INNER JOIN Trybesmith.products as p ON o.id = p.order_id group by o.id';
    const result = await this.connection.execute(`${select} ${from} ${innerJoin}`);
    const [rows] = result;
    return rows as Order[];
  }
}