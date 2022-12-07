import * as express from 'express';
import MatchController from '../controller/match.controller';
import { authToken } from '../middlewares/login.middleware';

const route = express.Router();

route.get('/', MatchController.getAllMatchs);
route.post('/', authToken, MatchController.createMatch);
route.patch('/:id/finish', authToken, MatchController.finishMatch);

export default route;
