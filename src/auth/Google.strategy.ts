import { Injectable, BadRequestException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService, Provider } from './Auth.service';
import { ConfigService } from '../config/config.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
    private config: ConfigService,
  ) {
    super({
      clientID: config.googleClientID,
      clientSecret: config.googleClientSecret,
      callbackURL: config.googleCallbackURL,
      passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile:any,
    done: Function,
  ) {
    try {
      if (!profile) {
        done(new BadRequestException(), null);
      }
      const userProfile = {
        provider: Provider.GOOGLE,
        locale: profile._json.locale,
        emailVerified: profile._json.email_verified,
        icon: profile._json.picture,
        thirdPartyId: profile._json.sub,
        username: profile._json.name,
        email: profile._json.email,
        password: profile._json.sub,
      };
      const jwt: string = await this.authService.validateOAuthLogin(
        userProfile,
      );
      const user = {
        jwt,
      };
      done(null, user);
    } catch (err) {
      // console.log(err)
      done(err, false);
    }
  }
}
