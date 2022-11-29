import * as express from 'express';
import TeamController from '../controller/team.controller';

const route = express.Router();

route.get('/', TeamController.getAllTeams);
route.get('/:id', TeamController.findTeam);

export default route;
