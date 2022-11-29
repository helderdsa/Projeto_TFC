import Team from '../database/models/Team.model';

class TeamService {
  getTeams = async () => {
    const teams = await Team.findAll();

    return teams;
  };

  findTeam = async (id: string) => {
    const team = await Team.findOne({ where: { id } });

    return team?.dataValues;
  };
}

export default TeamService;
