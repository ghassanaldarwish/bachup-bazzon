import { HttpException } from '@nestjs/common/exceptions/http.exception';
import {
  NestMiddleware,
  HttpStatus,
  Injectable,
  Middleware,
  MiddlewareFunction,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/Users.service';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AdminAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly usersService: UsersService,
    private config: ConfigService,
  ) {}

  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      next()
    
    };
  }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      if (!!token) {
        const decoded: any = jwt.verify(token, this.config.jwtSecretKey);

        const user = await this.usersService.findById(decoded._id);

        if (!user) {
          throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
        }
        if (!user.admin) {
          throw new HttpException(
            'Not Admin Authorized.',
            HttpStatus.UNAUTHORIZED,
          );
        }

        req.user = user;
        next();
      }
    } catch (e) {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
