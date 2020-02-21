import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

//import { PageDTO } from './Page.dto';

@Injectable()
export class PagesService {
  constructor(
    // @InjectModel('product')
    // private readonly productModel: Model<any>,
    @InjectModel('page')
    private readonly pageModel: Model<any>,
  ) {}
  private async findPageByName(pageName: string) {
    return await this.pageModel.findOne({ page: pageName });
  }

  public async findPage(pageName:any) {
    const page = this.findPageByName(pageName);
    return page;
  }
  public getAllPages() {
    console.log('getAllPages');
  }
  async create(data: any) {
    const { _id, id, page, title, description, options } = data;
    const pageModal = await this.pageModel.findById(_id);

    if (!pageModal) {
      await new this.pageModel({
        id,
        page,
        title,
        description,
        options,
      }).save();
    } else {
      //update

      if (!!title) {
        pageModal.title = title;
      }
      if (!!description) {
        pageModal.description = description;
      }
      if (!!options && options.length > 0) {
        pageModal.options = options;
      }

      await pageModal.save();
    }
  }
}
