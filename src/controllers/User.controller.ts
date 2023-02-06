import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import statusCodes from '../../statusCode';
import UserService from '../services/user.service';

const jwtConfig: object = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const secret: any = process.env.JWT_SECRET;

class UserController {
  constructor(private userService = new UserService()) {

  }

  public create = async (req: Request, res: Response) => {
    const user = req.body;

    const userCreated = await this.userService.create(user);

    const token = jwt.sign(userCreated, secret, jwtConfig);

    res.status(statusCodes.CREATED).json({ token });
  };
}

export default UserController;