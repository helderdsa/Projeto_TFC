// import Team from '../database/models/Team.model';
import Match from '../database/models/Match.model';

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
}

export default MatchService;
