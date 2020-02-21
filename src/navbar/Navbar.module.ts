import { Module } from '@nestjs/common';
import { NavbarService } from './Navbar.service';
import { NavbarController } from './Navbar.controller';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [NavbarController],
  providers: [NavbarService],
})
export class NavbarModule {}
