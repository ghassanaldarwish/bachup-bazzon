import { Injectable } from '@nestjs/common';
import { navbarConfig } from './DB';
@Injectable()
export class NavbarService {
  constructor() {}

  public getNavbar() {
    return navbarConfig;
  }
}
