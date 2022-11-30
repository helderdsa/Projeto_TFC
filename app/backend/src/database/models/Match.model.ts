import { Model, INTEGER, BOOLEAN, ForeignKey } from 'sequelize';
import db from '.';
import Team from './Team.model';

class Match extends Model {
  declare id: number;
  declare homeTeam: ForeignKey<Team['id']>;
  declare homeTeamGoals: number;
  declare awayTeam: ForeignKey<Team['id']>;;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: Team,
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: Team,
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  },
}, { underscored: true,
  sequelize: db,
  timestamps: false,
});

Match.belongsTo(Team, {
  as: 'teams',
  foreignKey: 'home_team',
});

Match.belongsTo(Team, {
  as: 'teams',
  foreignKey: 'away_team',
});

Team.hasMany(Match, {
  as: 'matches',
  foreignKey: 'home_team',
});

Team.hasMany(Match, {
  as: 'matches',
  foreignKey: 'away_team',
});

export default Match;
