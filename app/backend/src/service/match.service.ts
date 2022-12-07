// import Team from '../database/models/Team.model';
import Match from '../database/models/Match.model';
import IMatch from '../interfaces/IMatch';

class MatchService {
  getMatchs = async () => {
    const matchs = await Match.findAll({
      include: [
        { all: true, attributes: { exclude: ['id'] } },
      ],
    });
    return matchs;
  };

  getMatchsQuery = async (inProgress: string) => {
    const status = inProgress === 'true';
    const matchs = await Match.findAll({
      include: [
        { all: true, attributes: { exclude: ['id'] } },
      ],
      where: { inProgress: status },
    });
    console.log(inProgress);

    return matchs;
  };

  addMatch = async (match: IMatch) => {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = match;

    const newMatch = await Match
      .create({ homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress: true });

    return newMatch;
  };
}

export default MatchService;
