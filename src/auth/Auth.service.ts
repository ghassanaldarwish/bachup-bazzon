import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UsersService } from '../users/Users.service';
import { ConfigService } from '../config/config.service';
export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private config: ConfigService,
  ) {}

  async validateOAuthLogin(userProfile:any): Promise<string> {
    try {
      let user = await this.usersService.findOAuthUserByThirdPartyId(
        userProfile.thirdPartyId,
        userProfile.provider,
      );
      if (!user) {
        user = await this.usersService.registerOAuthUserByThirdParty(
          userProfile,
        );
      }

      const { _id, superAdmin, admin, email, date, username } = user;

      const jwt: string = sign(
        { _id, superAdmin, admin, email, date, username },
        this.config.jwtSecretKey,
        {
          expiresIn: '7d',
        },
      );
      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}
