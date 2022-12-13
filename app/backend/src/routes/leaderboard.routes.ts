import * as express from 'express';
import LeaderboardController from '../controller/leaderboard.controller';

const route = express.Router();

route.get('/home', LeaderboardController.getHomeDataLB);
route.get('/away', LeaderboardController.getAwayDataLB);
route.get('/', LeaderboardController.getGeneralDataLB);

export default route;
