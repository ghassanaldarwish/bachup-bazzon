import { Module } from '@nestjs/common';
import { AuthController } from './Auth.controller';
import { AuthService } from './Auth.service';
import { GoogleStrategy } from './Google.strategy';
import { JwtStrategy } from './Jwt.strategy';
import { UsersModule } from '../users/Users.module';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [UsersModule, ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtStrategy],
})
export class AuthModule {}
