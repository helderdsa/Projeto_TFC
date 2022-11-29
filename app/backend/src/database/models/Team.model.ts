import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Team extends Model {
}

Team.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, { underscored: true,
  sequelize: db,
  timestamps: false,
});

export default Team;
