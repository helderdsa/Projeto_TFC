import { Request, Response } from 'express';
import LeaderboardService from '../service/leaderboard.service';

const leadboardService = new LeaderboardService();

class LeaderboardController {
  static getHomeDataLB = async (req: Request, res: Response) => {
    const result = await leadboardService.getTeamDataAsHome();
    res.status(200).json([...result]);
  };

  static getAwayDataLB = async (req: Request, res: Response) => {
    const result = await leadboardService.getTeamDataAsAway();
    res.status(200).json([...result]);
  };

  static getGeneralDataLB = async (req: Request, res: Response) => {
    const result = await leadboardService.getAllTeamData();
    res.status(200).json([...result]);
  };
}

export default LeaderboardController;
