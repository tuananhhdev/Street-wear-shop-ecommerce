import { IUser } from '../common/types/user/user.interface';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export {};