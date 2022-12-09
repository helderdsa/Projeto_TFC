import * as express from 'express';
import LeaderboardController from '../controller/leaderboard.controller';

const route = express.Router();

route.get('/home', LeaderboardController.test);

export default route;
