import { Request, Response } from 'express';
import LeaderboardService from '../service/leaderboard.service';

const leadboardService = new LeaderboardService();

class LeaderboardController {
  static test = async (req: Request, res: Response) => {
    const result = await leadboardService.getTeamData();
    res.status(200).json([...result]);
  };
}

export default LeaderboardController;
