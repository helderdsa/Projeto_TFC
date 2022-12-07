import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import LoginService from '../service/login.service';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export const validateEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  next();
};

export const validateFields = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
};

export const authToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization');
    const decoded = verify(token as string, secret) as JwtPayload;
    const { email, password } = decoded;
    await LoginService.login(email, password);

    next();
  } catch {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};

// export default { validateEmail, validateFields };
