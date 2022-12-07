import { Request, Response, NextFunction } from 'express';
import TeamService from '../service/team.service';

const teamService = new TeamService();

export const sameTeamValidation = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  next();
};

export const teamExistOnDB = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const hteam = await teamService.findTeam(homeTeam);
  const ateam = await teamService.findTeam(awayTeam);

  console.log(hteam, ateam);

  if (!hteam || !ateam) {
    return res.status(404)
      .json({ message: 'There is no team with such id!' });
  }
  next();
};

// export default sameTeamValidation;
