import { Request, Response } from 'express';
import MatchService from '../service/match.service';

const matchService = new MatchService();

class MatchController {
  static getAllMatchs = async (_req: Request, res: Response) => {
    const teams = await matchService.getMatchs();

    res.status(200).json([...teams]);
  };
}

export default MatchController;
