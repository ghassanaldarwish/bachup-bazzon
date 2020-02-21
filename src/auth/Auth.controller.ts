import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '../config/config.service';

@Controller('auth')
export class AuthController {
  constructor(private config: ConfigService) {}

  @UseGuards(AuthGuard('google'))
  @Get('google')
  googleLogin() {}
  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  googleCallback(@Req() req:any, @Res() res:any) {
    const jwt: string = req.user.jwt;
    if (jwt) {
      return res.redirect(
        this.config.clientDomain + '/accessToken?token=' + jwt,
      );
    } else {
      res.redirect('/login/failure');
    }
  }
}
