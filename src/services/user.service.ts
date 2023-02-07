import { BadRequestError } from 'restify-errors';
import connection from '../models/connection';
import UserModel from '../models/Users.model';
import User from '../interfaces/user.interface';

const properties = ['username', 'vocation', 'level', 'password'];
class UserService {
  public model: UserModel;
  
  constructor() {
    this.model = new UserModel(connection);
  }
  
  static validateProperties(user: User): [boolean, string | null] {
    for (let i = 0; i < properties.length; i += 1) {
      if (!Object.prototype.hasOwnProperty.call(user, properties[i])) {
        return [false, properties[i]];
      }
    }
    return [true, null];
  }
  
  static validateValues(user: User): [boolean, string | null] {
    const entries = Object.entries(user);
    for (let i = 0; i < entries.length; i += 1) {
      const [property, value] = entries[i];
      if (!value) {
        return [false, property];
      }
    }
    return [true, null];
  }
  
  static validationProduct(user: User) : void | string {
    let [valid, property] = UserService.validateProperties(user);
  
    if (!valid) {
      return `O campo ${property} é obrigatório`;
    }
    [valid, property] = UserService.validateValues(user);
  
    if (!valid) {
      return `O campo ${property} não pode ser nulo ou vazio`;
    }
  }
  
  public async create(user: User): Promise<User> {
    const isValidUser = UserService.validationProduct(user);
    if (typeof isValidUser === 'string') {
      // aqui estamos jogando o erro para o nosso middleware de erro fazer o tratamento e dar a resposta da requisição
      throw new BadRequestError(isValidUser);
    }
    const createdProduct = await this.model.create(user);
    return createdProduct;
  }
}

export default UserService;