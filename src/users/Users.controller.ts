import {
  Controller,
  Get,
  Param,
  Response,
  UseGuards,
  Body,
  Post,
  Request,
} from '@nestjs/common';
import { UsersService } from './Users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('basic-user/:id')
  findUserBasic(@Param() param: any) {
    console.log(this.usersService.findById(param.id));
    return this.usersService.findBasicUser(param.id);
  }

  @Get('current-user')
  getCurrentUser(@Response() res: any, @Request() req: any) {}

  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  protectedResource() {
    return 'JWT is working!';
  }
  // @UseGuards(AuthGuard('google'))
  // @Get('google/callback')
  // googleCallback(@Response() res: Res) {
  //    console.log('ressss ===>', res);
  //   res.send('ok');
  // }
  // @Get('protected')
  // @UseGuards(AuthGuard('jwt'))
  // protectedResource() {
  //   return 'JWT is working!';
  // }

  // @Post('login')
  // async login(@Body() userDTO) {
  //   const user = await this.userService.findByLogin(userDTO);
  //   const payload = {
  //     username: user.username,
  //     seller: user.seller,
  //   };
  //   const token = await this.authService.signPayload(payload);
  //   return { user, token };
  // }

  // @Post('register')
  // async register(@Body() userDTO) {
  //   const user = await this.userService.create(userDTO);
  //   const payload = {
  //     username: user.username,
  //     seller: user.seller,
  //   };
  //   const token = await this.authService.signPayload(payload);
  //   return { user, token };
  // }
}
