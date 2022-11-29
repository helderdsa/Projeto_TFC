import { Request, Response } from 'express';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import LoginService from '../service/login.service';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const generateToken = async (data: object): Promise<string> => {
  const token = await sign(data, secret);
  return token;
};

const loginService = new LoginService();

class LoginController {
  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      await LoginService.login(email, password);
      const token = await generateToken(req.body);
      res.status(200).json({ token });
    } catch (e) {
      const error = e as Error;
      res.status(401).json({ message: error.message });
    }
  };

  static getRole = async (req: Request, res: Response) => {
    try {
      const token = req.header('Authorization');
      const decoded = verify(token as string, secret) as JwtPayload;
      const role = await loginService.getRole(decoded.email);

      res.status(200).json({ role });
    } catch (e) {
      const error = e as Error;
      res.status(401).json({ message: error.message });
    }
  };
}

export default LoginController;
