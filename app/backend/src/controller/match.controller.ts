import { Request, Response } from 'express';
import IMatch from '../interfaces/IMatch';
import MatchService from '../service/match.service';

const matchService = new MatchService();

class MatchController {
  static getAllMatchs = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress) {
      const teams = await matchService.getMatchsQuery(inProgress as string);
      return res.status(200).json([...teams]);
    }

    const teams = await matchService.getMatchs();

    res.status(200).json([...teams]);
  };

  static createMatch = async (req: Request, res: Response) => {
    const match: IMatch = req.body;

    const newMatch = await matchService.addMatch(match);

    res.status(201).json(newMatch);
  };

  static finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;

    await matchService.finishMatch(id);

    res.status(200).json({ message: 'Finished' });
  };

  static editMatchGoals = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await MatchService.editMatchGoals(homeTeamGoals, awayTeamGoals, id);

    res.status(200).json({ message: 'match edited' });
  };
}

export default MatchController;
