import * as bcrypt from 'bcryptjs';
import User from '../database/models/User.model';

class LoginService {
  static login = async (email: string, password: string) => {
    const user = await User.findOne({ where: { email } });
    const userPassword: string = user?.dataValues.password;

    if (!user?.dataValues || !await bcrypt.compare(password, userPassword)) {
      throw new Error('Incorrect email or password');
    }
  };

  getRole = async (email: string) => {
    const user = await User.findOne({ where: { email } });

    return user?.dataValues.role;
  };
}

export default LoginService;
