import { Request, Response } from 'express';
import TeamService from '../service/team.service';

const teamService = new TeamService();

class TeamController {
  static getAllTeams = async (_req: Request, res: Response) => {
    const teams = await teamService.getTeams();

    res.status(200).json([...teams]);
  };

  static findTeam = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await teamService.findTeam(id);

    res.status(200).json({ ...team });
  };
}

export default TeamController;
