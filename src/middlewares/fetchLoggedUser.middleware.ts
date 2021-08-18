// src/middlewares/fetchLoggedUser.middleware.ts
import {inject, injectable} from 'inversify';
import {NextFunction, Request, Response} from 'express';
import {BaseMiddleware} from 'inversify-express-utils';
import {JsonWebTokenService} from '../services/jsonWebTokens.service';
import { User } from '@entities/User';
import { UserRepository } from '@repositories/user/User.Repository';

@injectable()
export class FetchLoggedUserMiddleware extends BaseMiddleware {
  constructor(
    private userRepository: UserRepository,
    @inject("JsonWebTokenService")
    private readonly jsonWebTokenService: JsonWebTokenService
  ) {
    super();
  }

  public async handler(
    req: Request & { user: User },
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    const token = req.headers.authorization?.replace(/bearer/i, "").replace(/\s/g, "");

    if (token === undefined) {
      return res.status(403).send("You must provide an `Authorization` header");
    }

    try {
      const payload: any = this.jsonWebTokenService.decode(token);

      req.user = await this.userRepository.findOne(payload.id);
    } catch (e) {
      return res.status(403).send("Invalid token");
    }

    next();
  }
}
