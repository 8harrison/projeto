import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import statusCodes from '../../statusCode';
import LoginService from '../services/Login.service';

const jwtConfig: object = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const secret: string = process.env.JWT_SECRET || 'qualquercoisa';

class LoginController {
  constructor(private loginService = new LoginService()) {

  }

  public create = async (req: Request, res: Response) => {
    const login = req.body;
    try {
      const loginCreated = await this.loginService.create(login);

      const token = jwt.sign(loginCreated, secret, jwtConfig);

      res.status(statusCodes.OK).json({ token });
    } catch (e: any) {
      res.status(e.status).json(e.message);
    }
  };
}

export default LoginController;