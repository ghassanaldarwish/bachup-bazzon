import { Controller, Get, Response, Request } from '@nestjs/common';
import { NavbarService } from './Navbar.service';
//import * as uuid from 'uuid/v4';

@Controller('navbar')
export class NavbarController {
  constructor(private readonly navbarService: NavbarService) {}

  @Get()
  async getAllPages(@Response() res: any, @Request() req: any) {
    return res.json(this.navbarService.getNavbar());
  }
}
