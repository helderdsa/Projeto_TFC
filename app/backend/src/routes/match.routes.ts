import * as express from 'express';
import MatchController from '../controller/match.controller';
import { authToken } from '../middlewares/login.middleware';

const route = express.Router();

route.get('/', MatchController.getAllMatchs);
route.post('/', authToken, MatchController.createMatch);

export default route;
