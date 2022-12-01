import * as express from 'express';
import MatchController from '../controller/match.controller';

const route = express.Router();

route.get('/', MatchController.getAllMatchs);

export default route;
