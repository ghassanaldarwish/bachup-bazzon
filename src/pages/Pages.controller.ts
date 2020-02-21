import {
  Controller,
  Get,
  Response,
  Request,
  Post,
  Body,
  Req,
  Render,
} from '@nestjs/common';
import { PagesService } from './Pages.service';
//import * as uuid from 'uuid/v4';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get('test')
  @Render('Index')
  getHello() {
    return {
      title: 'Nest with Next',
    };
  }

  @Get()
  async getAllPages(@Response() res: any, @Request() req: any) {
    console.log(await this.pagesService.getAllPages());
    return this.pagesService.getAllPages();
  }

  @Get(':page')
  async findPage(@Response() res: any, @Request() req: any) {
    const pageName: string = req.params.page;
    const page = await this.pagesService.findPage(pageName);
    return res.json(page);
  }

  @Post()
  async create(
    @Body() createPageDto: any,
    @Response() res: any,
    @Req() req: any,
  ) {
    await this.pagesService.create(createPageDto);
    return res.send(true);
  }
}
