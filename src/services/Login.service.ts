// import { BadRequestError } from 'restify-errors';
import Joi from 'joi';
import connection from '../models/connection';
import LoginModel from '../models/Login.model';
import Login from '../interfaces/login.interface';
import Erro from '../interfaces/erro.interface';
import statusCodes from '../../statusCode';

// const properties = ['username', 'vocation', 'level', 'password'];

const schema = Joi.object({
  username: Joi.string().max(45).required().label('username'),
  password: Joi.string().max(45).required().label('password'),
}).messages({
  'any.required': '{$label} is required'
});
class LoginService {
  public model: LoginModel;
  
  constructor() {
    this.model = new LoginModel(connection);
  }
  
  public async create(login: Login): Promise< Erro | Login> {
    const { error } = schema.validate(login);
    if (error) {
      const er: object = { status: statusCodes.BAD_REQUEST, message: error.message };
      throw er;
    }
    
    const createdLogin = await this.model.create(login);
    return createdLogin;
  }
}

export default LoginService;