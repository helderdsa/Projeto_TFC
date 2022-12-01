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
}

export default MatchService;
