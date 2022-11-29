import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import LoginService from '../service/login.service';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const authToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization');
    const decoded = verify(token as string, secret) as JwtPayload;
    const { email, password } = decoded.data;
    await LoginService.login(email, password);

    next();
  } catch {
    res.status(401).json({ message: 'Token Invalido' });
  }
};

export default authToken;
