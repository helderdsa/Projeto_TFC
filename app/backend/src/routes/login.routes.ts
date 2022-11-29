import * as express from 'express';
import LoginController from '../controller/login.controller';
import { validateEmail, validateFields, authToken } from '../middlewares/login.middleware';

const route = express.Router();

route.post('/', validateFields, validateEmail, LoginController.login);
route.get('/validate', authToken, LoginController.getRole);

export default route;
