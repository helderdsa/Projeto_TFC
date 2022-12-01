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
    field: 'home_team',
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
    field: 'away_team',
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
  foreignKey: 'homeTeam',
  as: 'teamHome',
});

Match.belongsTo(Team, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
});

Team.hasMany(Match, {
  foreignKey: 'homeTeam',
  as: 'teamHome',
});

Team.hasMany(Match, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
});

export default Match;
